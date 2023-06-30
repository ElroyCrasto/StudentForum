from flask_restful import Resource
from flask import jsonify, request
from .ApiDataParser import NewUsernameCheck, UserSignUpData, MakePostData
from .DatabaseModels import User, Post, Room
from . import Database as db
import re, datetime, random, string

def TokenGeneration(Table, Filter):
    Token = ''.join(random.choices(string.ascii_uppercase +
                                           string.digits + string.ascii_lowercase, k=15))
    if Filter == "AuthToken":Check = Table.query.filter_by(AuthToken=Token).first()
    if Filter == 'PublicID':Check = Table.query.filter_by(PublicID=Token).first()
    if Check:
        return TokenGeneration(Table, Filter)
    else:
        return Token

def SpecialCharCheck(String):
    regex = re.compile('[\s@_!#$%^&*()<>?/\|}{~:]')
    if(regex.search(String.strip()) == None):
        return True
    else:
        return False

class UserSignUp(Resource):
    @staticmethod
    def post():
        Data = UserSignUpData.parse_args()
        Check,Reason = UserSignUp.SignInValidation(Data)
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
    
    @staticmethod
    def SignInValidation(Info):
        
        # Username Check
        if (SpecialCharCheck(Info["Username"])) == False: return False,"Username Cannot Contain Special Charecters"
        CheckUsername = User.query.filter_by(Username=Info["Username"].strip()).first()
        if CheckUsername: return False, "Invalid Username"
        
        # FirstName and LastName Check
        if (SpecialCharCheck(Info["FirstName"].strip())) == False: return False,"FirstName Cannot Contain Special Charecters"
        if (SpecialCharCheck(Info["LastName"].strip())) == False: return False,"LastName Cannot Contain Special Charecters"
        
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

class MakePost(Resource):
    @staticmethod
    def post():
        Data = MakePostData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        
        # Type Validation
        Type = Data["Type"].strip()
        if Type not in ["Question","General"]:
            return jsonify({"Staus":0,"Message":"Invalid Post Type!"})

        # Token Validation
        if not Cookie: return({"Staus":0, "Message":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            res = jsonify({"Staus":0,"Message":"Invalid Token"})
            return res
        
        # User-Room Privellege Validation
        _Room = Room.query.filter_by(Title=Data["RoomName"].strip()).first()
        if not _Room:
            return jsonify({"Staus":0,"Message":"Room Does Not Exist!"})
        else:
            if not ((_Room.Course == CurrentUser.Course or _Room.Course == "ALL") and (_Room.Year == CurrentUser.Year or _Room.Year == "ALL")):
               return jsonify({"Staus":0,"Message":"You Do Not Have Access to Post in This Room"})
        
        # Saving Post To Database
        try:
            NewPost = Post(TokenGeneration(Post, 'PublicID'), Type, Data["Title"].strip(), Data["Content"], _Room.ID, CurrentUser.ID)
            db.session.add(NewPost)
            db.session.commit()
        except :
            return jsonify({"Staus":0,"Message":"An Error Occured!"})

        # Response    
        res = jsonify({"Staus":1,"Message":"Post Created Successfully!"})
        return res