from flask import Flask
from flask_restful import Api
from resources.bmi_prediction_model import BMIPredictionModel
from resources.height_prediction_model import HeightPredictionModel

app = Flask(__name__)
api = Api(app)

api.add_resource(BMIPredictionModel, '/api/bmi')
api.add_resource(HeightPredictionModel, '/api/height')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=8000)