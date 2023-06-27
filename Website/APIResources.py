from flask_restful import Resource
from flask import jsonify
from .ApiDataParser import UserLoginData, NewUsernameCheck
from .DatabaseModels import User


class UserLoginVerification(Resource):
    @staticmethod
    def post():
        Data = UserLoginData.parse_args()
        Check = User.query.filter_by(Username=Data["Username"], Password=Data["Password"]).first()
        if Check:
            res = jsonify({"Validation":"Success","AuthToken":Check.AuthToken})
            res.status_code = 200
        else:
            res = jsonify({"Validation":"Failed"})
            res.status_code = 401
        return res

class UsernameCheck(Resource):
    @staticmethod
    def post():
        Data = NewUsernameCheck.parse_args()
        check = User.query.filter_by(Username=Data["Username"]).first()
        if check:
            res = jsonify({"Error":"Username Already Exists"})
            res.status_code = 200
        else:
            res = jsonify({"Success":"Username is Available"})
            res.status_code = 200
        return res