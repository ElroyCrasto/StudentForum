from flask_restful import Resource
from flask import jsonify, request
from .ApiDataParser import NewUsernameCheck, UserSignUpData, MakePostData, ProfileDetailsData, RoomsData
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

def LengthCheck(limit :int, word :str):
    if len(word) < limit :return False 
    else:return True


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
            res = jsonify({"Status":0,"Msg":Reason})
        else:
            try:
                NewUser = User(Data["Username"].strip(),
                Data["FirstName"].strip(),
                Data["LastName"].strip(),
                datetime.datetime.strptime(Data["DOB"], '%Y-%m-%d').date(),
                Data["Password"].strip(),
                Data["Year"].strip(),
                Data["Course"].strip(),
                Data["SecurityQuestion"].strip(),
                Data["SecurityAnswer"].strip())
                db.session.add(NewUser)
                db.session.commit()
            except:
                return jsonify({"Status": 0,"Msg":"An Error Occured While Creating User"})
            res = jsonify({"Status": 1,"Msg":"User Registered Successfully"})
        return res
    
    @staticmethod
    def SignInValidation(Info):
        
        # Username Check
        if (SpecialCharCheck(Info["Username"])) == False: return False,"Username Cannot Contain Special Charecters"
        if not(Info["Username"].find(" ")) == -1: return False,"Username Cannot Contain Special Charecters"
        CheckUsername = User.query.filter_by(Username=Info["Username"].strip()).first()
        if CheckUsername: return False, "Invalid Username"
        if (LengthCheck(8,Info["Username"].strip()) == False): return False, "Length of Username has to be greater than 8"

        # FirstName and LastName Check
        if (SpecialCharCheck(Info["FirstName"].strip())) == False: return False,"FirstName Cannot Contain Special Charecters"
        if (SpecialCharCheck(Info["LastName"].strip())) == False: return False,"LastName Cannot Contain Special Charecters"
        if (LengthCheck(1,Info["FirstName"].strip()) == False): return False, "Length of FirstName has to be greater than 1"
        if (LengthCheck(1,Info["Username"].strip()) == False): return False, "Length of LastName has to be greater than 1"
        if not(Info["FirstName"].find(" ")) == -1: return False,"Username Cannot Contain Special Charecters"
        if not(Info["LastName"].find(" ")) == -1: return False,"Username Cannot Contain Special Charecters"

        # Password limit Check
        if (LengthCheck(8,Info["Password"]) == False): return False, "Length of Password has to be greater than 8"

        # DOB Check
        try:DOB = datetime.datetime.strptime(Info["DOB"], '%Y-%m-%d')
        except ValueError:return False, "Invalid DOB"
        else:CheckDOB = DOB.date()
        
        # Year Course RollNum SecurityQuestion Check
        CheckYear = True if Info["Year"] in ["FY","SY","TY"] else False
        CheckCourse = True if Info["Course"] in ["CS","IT"] else False
        CheckSecurityQuestion = True if Info["SecurityQuestion"] in ["Question"] else False # For The Time Period The Only Question Available is "Question"
        
        if CheckYear == False:return False, "Invalid Year"
        elif CheckCourse == False: return False, "Invalid Course"
        elif CheckSecurityQuestion == False: return False, "Invalid SecurityQuestion"

        # Validation Output
        return True,"No Issues Found"

class UsernameCheck(Resource):
    @staticmethod
    def post():
        Data = NewUsernameCheck.parse_args()
        if not (Data['Username'].strip().find(" ") == -1):
            return jsonify({"Status":0,"Msg":"Username Cannot Contain Spaces"})
        if not (LengthCheck(8,Data["Username"].strip())):
            return jsonify({"Status":0,"Msg":"Username Already Exists Or Isnt a Valid Username"})
        check = User.query.filter_by(Username=Data["Username"]).first()
        if check and SpecialCharCheck(Data["Username"]):
            res = jsonify({"Status":0,"Msg":"Username Already Exists Or Isnt a Valid Username"})
            res.status_code = 200
        else:
            res = jsonify({"Status":1,"Msg":"Username is Available"})
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
            return jsonify({"Status":0,"Msg":"Invalid Post Type!"})

        # Token Validation
        if not Cookie: return({"Status":0, "Msg":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            res = jsonify({"Status":0,"Msg":"Invalid Token"})
            return res
        
        # User-Room Privellege Validation
        _Room = Room.query.filter_by(Title=Data["RoomName"].strip()).first()
        if not _Room:
            return jsonify({"Status":0,"Msg":"Room Does Not Exist!"})
        else:
            if CurrentUser.Course == "ALL" and CurrentUser.Year == "ALL": pass
            elif not ((_Room.Course == CurrentUser.Course or _Room.Course == "ALL") and (_Room.Year == CurrentUser.Year or _Room.Year == "ALL")):
               return jsonify({"Status":2,"Msg":"You Do Not Have Access to Post in This Room"})
        
        # Saving Post To Database
        try:
            NewPost = Post(TokenGeneration(Post, 'PublicID'), Type, Data["Title"].strip(), Data["Content"], _Room.ID, CurrentUser.ID)
            db.session.add(NewPost)
            db.session.commit()
        except :
            return jsonify({"Status":0,"Msg":"An Error Occured!"})

        # Response    
        res = jsonify({"Status":1,"Msg":"Post Created Successfully!"})
        return res

class ProfileData(Resource):
    @staticmethod
    def post():
        Data = ProfileDetailsData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            res = jsonify({"Status":0,"Msg":"Invalid Token"})
            return res
        UserDetails = User.query.filter_by(Username=Data["Username"]).first()
        if not UserDetails:
            res = jsonify({"Status":0,"Msg":"No Such User"})
            return res
        res = jsonify({"Status": 1, "Profile": {"Username": UserDetails.Username,
                                                "FirstName": UserDetails.FirstName,
                                                "LastName": UserDetails.LastName,
                                                "Year": UserDetails.Year,
                                                "Course": UserDetails.Course,
                                                "Bio": UserDetails.Bio,
                                                "DOB": UserDetails.DOB,
                                                "JoinedAt":UserDetails.JoinedAt}
                                                            })
        return res

class GetRooms(Resource):
    @staticmethod
    def get():
        Cookie = request.cookies.get("AuthToken")
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            return jsonify({"Status":0,"Msg":"Invalid Token"})
        if CurrentUser.Course == "ALL" and CurrentUser.Year == "ALL": RoomsData = Room.query.all()
        else:
            RoomsData = Room.query.filter(Room.Year.in_([CurrentUser.Year, "ALL"])).filter(Room.Course.in_([CurrentUser.Course, "All"])).all()
        return jsonify({"RoomsList":[{"Title":i.Title,"Description":i.Description, "PublicID":i.PublicID, "Posts":len(i.PID)} for i in RoomsData], "Status":1 , "Msg":"Request Successful"})

class GetUserPost(Resource):
    @staticmethod
    def post():
        Data = ProfileDetailsData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            return jsonify({"Status":0,"Msg":"Invalid Token"})
        OtherUser = User.query.filter_by(Username=Data["Username"]).first()
        if not OtherUser:
            return jsonify({"Status":0,"Msg":"No Such user Exists"})
        _Posts = OtherUser.Posts
        PostsToShow = []
        for _Post in _Posts:
            RoomOfPost = Room.query.filter_by(ID=_Post.RID).first()
            if CurrentUser.Year == "ALL" and CurrentUser.Course == "ALL" :PostsToShow.append(_Post) 
            elif RoomOfPost.Year in [CurrentUser.Year, "ALL"] and RoomOfPost.Course in [CurrentUser.Course, "ALL"]:
                PostsToShow.append(_Post)
        res = jsonify({"Status":1,"Posts":[{"Title":i.Title,"Content":i.Content,"ID": i.PublicID, "PostedAt": i.PostedAt} for i in PostsToShow], "Msg":"Request Successfull"})  
        return res

class GetRoomPosts(Resource):
    @staticmethod
    def post():
        # Handling Data
        Data = RoomsData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        # Cookie Check
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})
        RoomID = Data["PublicID"]
        
        # UserVerification
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:
            return jsonify({"Status":0,"Msg":"Invalid Token"})
        _Room = Room.query.filter_by(PublicID=RoomID).first()
        
        # RoomID verification
        if not _Room:
            return jsonify({"Status":0,"Msg":"No Such Room Exists"})
        if CurrentUser.Course == "ALL" and CurrentUser.Year == "ALL": pass
        elif not ((_Room.Course == CurrentUser.Course or _Room.Course == "ALL") and (_Room.Year == CurrentUser.Year or _Room.Year == "ALL")):
            return jsonify({"Status":2,"Msg":"You Do Not Have Access to This Room"})
        Posts = _Room.PID
        res = jsonify({"Status":1, "Posts":[{"Title":i.Title,"Content":i.Content,"Views":i.Views,"PublicID":i.PublicID,"User":User.query.filter_by(ID=i.UID).first().Username, "PostedAt":i.PostedAt, "Type":i.Type} for i in Posts], "PostCount": len(Posts)})
        return res

class GetPost(Resource):
    @staticmethod
    def post():
        Data = RoomsData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})

        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser:return jsonify({"Status":0,"Msg":"Invalid Token"})

        _Post = Post.query.filter_by(PublicID=Data["PublicID"]).first()
        if not _Post:return jsonify({"Status":0, "Msg":"No Such Post"})

        _Room = Room.query.filter_by(ID=_Post.RID).first()
        if CurrentUser.Course == "ALL" and CurrentUser.Year == "ALL": pass
        elif not ((_Room.Course == CurrentUser.Course or _Room.Course == "ALL") and (_Room.Year == CurrentUser.Year or _Room.Year == "ALL")):
            return jsonify({"Status":2,"Msg":"You Do Not Have Access to This Post"})
        
        res = jsonify({"Status":1, "Title":_Post.Title,"Content":_Post.Content,"Views":_Post.Views,"PublicID":_Post.PublicID,"User":User.query.filter_by(ID=_Post.UID).first().Username, "PostedAt":_Post.PostedAt, "Type":_Post.Type, "Msg": "Request Successfull" })
        return res

class WebsiteInfo(Resource):
    @staticmethod
    def get():
        Users = User.query.all()
        Posts = Post.query.all()
        Rooms = Room.query.all()
        res = jsonify({
            "UserCount" : len(Users),
            "PostCount" : len(Posts),
            "RoomCount" : len(Rooms),
        })
        return res

class DeletePost(Resource):
    @staticmethod
    def post():
        Data = RoomsData.parse_args()
        Cookie = request.cookies.get("AuthToken")
        
        if not Cookie: return jsonify({"Status":0, "Msg":"Invalid Token"})
        CurrentUser = User.query.filter_by(AuthToken=Cookie).first()
        if not CurrentUser: return jsonify({"Status":0, "Msg":"Invalid Token"})

        _Post = Post.query.filter_by(PublicID=Data["PublicID"]).first()
        if not _Post: return jsonify({"Status":0, "Msg":"Invalid Post ID"})

        if not (_Post.UID == CurrentUser.ID):return jsonify({"Status":2, "Msg":"You are not the owner of this post"})
        db.session.delete(_Post)
        db.session.commit()

        res = jsonify({"Status":1, "Msg":"Post Deleted Successfully"})
        return res