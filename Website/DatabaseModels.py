from . import Database as db
from sqlalchemy import func
from flask_login import UserMixin


class User(db.Model,UserMixin):
    
    # Columns
    ID = db.Column("ID", db.Integer, primary_key=True)
    Username = db.Column("Username", db.String, unique=True,
                         nullable=False)                            # Username
    FirstName = db.Column("FirstName", db.String, nullable=False)   # Real FirstName
    LastName = db.Column("LastName", db.String, nullable=False)     # Real LastName
    Password = db.Column("Password", db.String, nullable=False)     # PasswordHash
    DOB = db.Column("DOB", db.Date, nullable=False)                 # YYYY-MM-DD
    Year = db.Column("YEAR", db.String, nullable=False)             # FY SY TY
    Course = db.Column("Course", db.String, nullable=False)         # CS/IT
    RollNum = db.Column("RollNum", db.Integer, nullable=False)      # RollNumber
    Bio = db.Column("Bio", db.String, nullable=True)                # Description In Profile
    AuthToken = db.Column("AuthToken", db.String, nullable=True)    # User Authentication Token
    JoinedAt = db.Column("JoinedAt",
                         db.DateTime(timezone=True),
                         default=func.now(), nullable=False)
    SecurityQuestion = db.Column("SecurityQuestion", db.String, nullable=False)
    SecurityAnswer = db.Column("SecurityAnswer", db.String, nullable=False)

    # Initializing User Object
    def __init__(self, Username, FirstName, LastName, DOB, Password, Year, Course, RollNum, SecurityQuestion, SecurityAnswer):
        self.Username = Username
        self.FirstName = FirstName
        self.LastName = LastName
        self.DOB = DOB
        self.Password = Password
        self.Year = Year
        self.Course = Course
        self.RollNum = RollNum
        self.SecurityQuestion = SecurityQuestion
        self.SecurityAnswer = SecurityAnswer
