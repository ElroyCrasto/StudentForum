# Imports
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
from flask_login import LoginManager

# Creeting SQLALchemy Database Object
Database = SQLAlchemy()



def CreateApp():
    # App Configuration
    App = Flask(__name__)
    App.config["SECRET_KEY"] = " "

    # Database Configuration
    App.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Database.db"
    from .DatabaseModels import User,Room,Post
    Database.init_app(App)

    # Blueprints
    from .PageRoutes import PageRoute
    from .PostRoutes import PostRoute
    App.register_blueprint(PageRoute)
    App.register_blueprint(PostRoute)

    # API Configuration
    API = Api(App)
    from .APIResources import MakePost, UserSignUp, UsernameCheck, ProfileData
    API.add_resource(UserSignUp, "/api/SignUp")
    API.add_resource(UsernameCheck, "/api/UsernameCheck")
    API.add_resource(MakePost, "/api/MakePost")
    API.add_resource(ProfileData, "/api/GetProfile")
    CORS(App)

    # Special Route
    @App.before_request
    def SetupDatabase():
        Database.create_all()
        Database.session.commit()

    LoginManagerObj = LoginManager()
    LoginManagerObj.init_app(App)
    LoginManagerObj.login_view = "PageRoute.LoginPage"

    @LoginManagerObj.user_loader
    def load_user(ID):
        return User.query.get(int(ID))
    return App
