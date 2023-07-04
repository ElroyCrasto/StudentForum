from flask_restful import reqparse

# Check for Valid Data for UsernameCheckApi
NewUsernameCheck = reqparse.RequestParser()
NewUsernameCheck.add_argument(
    "Username", type=str, help="Username Not Given", required=True)

# Checks for valid Data For SignUpApi
UserSignUpData = reqparse.RequestParser()
UserSignUpData.add_argument("Username", type=str, help="Username Invalid!", required=True)
UserSignUpData.add_argument("FirstName", type=str, help="FirstName Invalid!", required=True)
UserSignUpData.add_argument("LastName", type=str, help="LastName Invalid!", required=True)
UserSignUpData.add_argument("DOB", type=str, help="DOB Invalid!", required=True)
UserSignUpData.add_argument("Password", type=str, help="Password Invalid!", required=True)
UserSignUpData.add_argument("Year", type=str, help="Year Invalid!", required=True)
UserSignUpData.add_argument("Course", type=str, help="Course Invalid!", required=True)
UserSignUpData.add_argument("SecurityQuestion", type=str, help="SecurityQuestion Invalid!", required=True)
UserSignUpData.add_argument("SecurityAnswer", type=str, help="SecurityAnswer Invalid!", required=True)

# Checks For Valid Data in MakePost Page
MakePostData = reqparse.RequestParser()
MakePostData.add_argument("Title", type=str, help="Title Not Found", required=True)
MakePostData.add_argument("Type", type=str, help="Type Not Found", required=True)
MakePostData.add_argument("Content", type=str, help="Content Not Found", required=True)
MakePostData.add_argument("RoomName", type=str, help="Invalid Room", required=True)

# Checks For Valid Data in ProfileDetails

ProfileDetailsData = reqparse.RequestParser()
ProfileDetailsData.add_argument("Username", type=str, required=True) 

