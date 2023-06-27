from flask_restful import Resource
from flask import jsonify


class Test(Resource):
    @staticmethod
    def get():
        return jsonify({"Test": "Successfull"})
    
    @staticmethod
    def post():
        return "hello"
