# Imports
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS

# Creeting SQLALchemy Database Object
Database = SQLAlchemy()


def CreateApp():
    # App Configuration
    App = Flask(__name__)
    App.config["SECRET_KEY"] = " "

    # Database Configuration
    App.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Database.db"
    from .DatabaseModels import User
    Database.init_app(App)

    # Blueprints
    from .PageRoutes import PageRoute
    App.register_blueprint(PageRoute)

    # API Configuration
    API = Api(App)
    from .APIResources import UserLoginVerification, UsernameCheck
    API.add_resource(UserLoginVerification, "/api/LoginVeriication")
    API.add_resource(UsernameCheck, "/api/UsernameCheck")
    CORS(App)

    # Special Route
    @App.before_request
    def SetupDatabase():
        Database.create_all()
        Database.session.commit()

    return App
