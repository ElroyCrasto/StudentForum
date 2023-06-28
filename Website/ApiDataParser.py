from flask_restful import reqparse

UserLoginData = reqparse.RequestParser()
UserLoginData.add_argument(
    "Username", type=str, help="Username Not Found!", required=True)
UserLoginData.add_argument(
    "Password", type=str, help="Password Not Found!", required=True)


NewUsernameCheck = reqparse.RequestParser()
NewUsernameCheck.add_argument(
    "Username", type=str, help="Username Not Given", required=True)

UserSignUpData = reqparse.RequestParser()
UserSignUpData.add_argument("Username", type=str, help="Username Invalid!", required=True)
UserSignUpData.add_argument("FirstName", type=str, help="FirstName Invalid!", required=True)
UserSignUpData.add_argument("LastName", type=str, help="LastName Invalid!", required=True)
UserSignUpData.add_argument("DOB", type=str, help="DOB Invalid!", required=True)
UserSignUpData.add_argument("Password", type=str, help="Password Invalid!", required=True)
UserSignUpData.add_argument("Year", type=str, help="Year Invalid!", required=True)
UserSignUpData.add_argument("Course", type=str, help="Course Invalid!", required=True)
UserSignUpData.add_argument("RollNum", type=int, help="RollNum Invalid!", required=True)
UserSignUpData.add_argument("SecurityQuestion", type=str, help="SecurityQuestion Invalid!", required=True)
UserSignUpData.add_argument("SecurityAnswer", type=str, help="SecurityAnswer Invalid!", required=True)