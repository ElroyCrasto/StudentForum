from flask_restful import reqparse

UserLoginData = reqparse.RequestParser()
UserLoginData.add_argument(
    "Username", type=str, help="Username Not Found!", required=True)
UserLoginData.add_argument(
    "Password", type=str, help="Password Not Found!", required=True)


NewUsernameCheck = reqparse.RequestParser()
NewUsernameCheck.add_argument(
    "Username", type=str, help="Username Not Given", required=True)
