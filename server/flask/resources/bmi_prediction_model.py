from flask_restful import Resource, reqparse
from flask import request
from tf_bodypix.api import download_model, load_model, BodyPixModelPaths
from common.util import get_overall_ratio, get_image_data, get_object_height
import pickle, requests, tempfile, base64
import tensorflow.keras.preprocessing.image as Image

def load_bodypix():
    model_path = BodyPixModelPaths.RESNET50_FLOAT_STRIDE_16
    downloaded_model = download_model(model_path)
    bodypix_model = load_model(downloaded_model)

    return bodypix_model

def load_pretrained_model(file_path: str):
    if file_path.startswith('http://') or file_path.startswith('https://'):
        # Download the file from URL
        response = requests.get(file_path)
        response.raise_for_status()  # Raise an error for bad status codes
        model = pickle.loads(response.content)
    else:
        # Load the model from local file path
        with open(file_path, 'rb') as f:
            model = pickle.load(f)
    return model

bodypix_model = load_bodypix()

class BMIPredictionModel(Resource):
    def __init__(self):
        self.models = [
            {
                'id': 1,
                'name': 'Gradient Boosting',
                'filePath': "https://elitefitness.blob.core.windows.net/models/gb_model.pkl"
            },
            {
                'id': 2,
                'name': 'Random Forest',
                'filePath': "https://elitefitness.blob.core.windows.net/models/rf_model.pkl"
            },
            {
                'id': 3,
                'name': 'Support Vector Machine',
                'filePath': "https://elitefitness.blob.core.windows.net/models/svr_model.pkl"
            }
        ]
        self.body_pix = bodypix_model

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, location='args')
        args = parser.parse_args()
        model_id = args['id']

        if model_id:
            model = next((model for model in self.models if model['id'] == model_id), None)
            if model:
                return model
            else:
                return {'message': 'Model not found'}, 404
        else:
            return {'models': self.models}
        
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=int, required=True, help='ID cannot be blank', location='args')
        parser.add_argument('image', type=str, required=True, help='Image cannot be blank', location='files')

        args = parser.parse_args()
        model_id = args['id']
        image = request.files['image']

        image_data = image.read()
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_image:
            temp_image.write(image_data)
            temp_image_path = temp_image.name

        image = Image.load_img(temp_image_path, target_size=(720, 960))
        image_array = Image.img_to_array(image)
        result = self.body_pix.predict_single(image_array)

        mask = result.get_mask(threshold=0.75)
        poses = result.get_poses()
        image_data = get_image_data(mask)
        object_height = get_object_height(image_data)

        if len(poses) == 0:
            return {'message': 'No person detected'}, 400
        keypoints = poses[0].keypoints

        WTR, WHpR, WHdR, HpHdR, Area = get_overall_ratio(image_data, keypoints)
        features = [WTR, WHpR, WHdR, HpHdR, Area]
        # convert features to string
        # features = ','.join(map(str, features))

        model = next((model for model in self.models if model['id'] == model_id), None)
        if model:
            pretrained_weight = load_pretrained_model(model['filePath'])
            print(pretrained_weight)
            bmi = pretrained_weight.predict([features])

            # convert bmi to string
            bmi = ','.join(map(str, bmi))
            return {"bmi": bmi, "object_height": object_height}
        else:
            return {'message': 'Model not found'}, 404