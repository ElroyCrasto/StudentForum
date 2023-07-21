from flask import Blueprint, render_template
from flask_login import login_required
from .APIResources import TokenGeneration
from . import Database

PostRoute = Blueprint("PostRoute", __name__)

@PostRoute.route("/PostUpload")
@login_required
def CreatePost():
    return render_template("CreatePost.html")

@PostRoute.route("/Post")
@login_required
def ShowPost():
    return render_template("Post.html")

@PostRoute.route("/CreateRooms")
def CreateRooms():
    from .DatabaseModels import Room, User
    try:
        import datetime
        Admin = User("Admin", "Admin", "Admin", datetime.datetime.strptime("2004-08-26", '%Y-%m-%d').date(), "admin123", "ALL", "ALL", "Question", "Null")
        Room1 = Room(Title="FYCS", Description="Official Room of FYCS", Course="CS", Year="FY", PublicID=TokenGeneration(Room, "PublicID"))
        Room2 = Room(Title="SYCS", Description="Official Room of SYCS", Course="CS", Year="SY", PublicID=TokenGeneration(Room, "PublicID"))
        Room3 = Room(Title="TYCS", Description="Official Room of TYCS", Course="CS", Year="TY", PublicID=TokenGeneration(Room, "PublicID"))
        Room4 = Room(Title="FYIT", Description="Official Room of FYIT", Course="IT", Year="FY", PublicID=TokenGeneration(Room, "PublicID"))
        Room5 = Room(Title="SYIT", Description="Official Room of SYIT", Course="IT", Year="SY", PublicID=TokenGeneration(Room, "PublicID"))
        Room6 = Room(Title="TYIT", Description="Official Room of TYIT", Course="IT", Year="TY", PublicID=TokenGeneration(Room, "PublicID"))
        Database.session.add_all([Room1,Room2,Room3,Room4,Room5,Room6,Admin])
        Database.session.commit()
        return "Rooms and Admin Created"
    except Exception as Ex:
        return f"{Ex}" + f"<br><h1>Rooms or Admin User Probably already exists.</h1>"
    
@PostRoute.route("/Rooms")
def ShowRooms():
    return render_template("Rooms.html")

@PostRoute.route("/RoomPage")
def DisplayRoom():
    return render_template("RoomPage.html")

@PostRoute.route("/ManagePost")
def DeletePost():
    return render_template("ManagePost.html")