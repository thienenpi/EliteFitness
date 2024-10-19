from flask_restful import Resource, reqparse, request
from common.network import UNet as HUNet
from torchvision import transforms
from PIL import Image
import torch
import cv2
import numpy as np

model_h = HUNet(128)
pretrained_model_h = torch.load('/Users/thiennguyen/Documents/GitHub/HeightWeightFinder/models/model_ep_48.pth.tar', map_location=torch.device('cpu'))
model_h.load_state_dict(pretrained_model_h["state_dict"])
model = model_h
model.eval()
RES = 128

class HeightPredictionModel(Resource):
    def __init__(self) -> None:
        pass

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('image', type=str, required=True, help='Image cannot be blank', location='files')
        args = parser.parse_args()
        
        image_file = request.files['image']
        image = Image.open(image_file)
        image = image.convert('RGB')
        image_np = np.array(image).astype('float32')
        X = cv2.cvtColor(image_np, cv2.COLOR_BGR2RGB).astype('float32')
        scale = RES / max(X.shape[:2])
        
        X_scaled = cv2.resize(X, (0,0), fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR) 
        
        if X_scaled.shape[1] > X_scaled.shape[0]:
            p_a = (RES - X_scaled.shape[0])//2
            p_b = (RES - X_scaled.shape[0])-p_a
            X = np.pad(X_scaled, [(p_a, p_b), (0, 0), (0,0)], mode='constant')
        elif X_scaled.shape[1] <= X_scaled.shape[0]:
            p_a = (RES - X_scaled.shape[1])//2
            p_b = (RES - X_scaled.shape[1])-p_a
            X = np.pad(X_scaled, [(0, 0), (p_a, p_b), (0,0)], mode='constant') 
        
        X /= 255
        X = transforms.ToTensor()(X).unsqueeze(0)

        with torch.no_grad():
            _, _, h_p = model(X)

        return {'height': h_p.item()}