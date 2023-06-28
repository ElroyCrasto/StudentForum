from flask_restful import Resource
from flask import jsonify
from .ApiDataParser import UserLoginData, NewUsernameCheck, UserSignUpData
from .DatabaseModels import User
from . import Database as db
import re
import datetime

def SpecialCharCheck(String):
    regex = re.compile('[\s@_!#$%^&*()<>?/\|}{~:]')
    if(regex.search(String.strip()) == None):
        return True
    else:
        return False

def SignInValidation(Info):
    
    # Username Check
    if (SpecialCharCheck(Info["Username"])) == False: return False,"Username Cannot Container Special Charectors"
    CheckUsername = User.query.filter_by(Username=Info["Username"].strip()).first()
    if CheckUsername: return False, "Invalid Username"
    
    # FirstName and LastName Check
    if (SpecialCharCheck(Info["FirstName"])) == False: return False,"FirstName Cannot Container Special Charectors"
    if (SpecialCharCheck(Info["LastName"])) == False: return False,"LastName Cannot Container Special Charectors"
    
    # DOB Check
    try:DOB = datetime.datetime.strptime(Info["DOB"], '%Y-%m-%d')
    except ValueError:return False, "Invalid DOB"
    else:CheckDOB = DOB.date()
    
    # Year Course RollNum SecurityQuestion Check
    CheckYear = True if Info["Year"] in ["FY","SY","TY"] else False
    CheckCourse = True if Info["Course"] in ["CS","IT"] else False
    CheckRollNum = User.query.filter_by(RollNum=Info["RollNum"]).first()
    CheckSecurityQuestion = True if Info["SecurityQuestion"] in ["Question"] else False # For The Time Period The Only Question Available is "Question"
    
    if CheckYear == False:return False, "Invalid Year"
    elif CheckCourse == False: return False, "Invalid Course"
    elif CheckRollNum: return False, "Invalid RollNumber" 
    elif CheckSecurityQuestion == False: return False, "Invalid SecurityQuestion"

    # Validation Output
    return True,"No Issues Found"

class UserSignUp(Resource):
    @staticmethod
    def post():
        Data = UserSignUpData.parse_args()
        Check,Reason = SignInValidation(Data)
        if Check == False:
            res = jsonify({"Error":Reason})
        else:
            try:
                NewUser = User(Data["Username"].strip(),
                Data["FirstName"].strip(),
                Data["LastName"].strip(),
                datetime.datetime.strptime(Data["DOB"], '%Y-%m-%d').date(),
                Data["Password"].strip(),
                Data["Year"].strip(),
                Data["Course"].strip(),
                Data["RollNum"],
                Data["SecurityQuestion"].strip(),
                Data["SecurityAnswer"].strip())
                db.session.add(NewUser)
                db.session.commit()
            except:
                return jsonify({"Error":"An Error Occured While Creating User"})
            res = jsonify({"Success":"User Registered Successfully"})
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