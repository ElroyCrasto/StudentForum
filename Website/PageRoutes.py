from flask import Blueprint, render_template

PageRoute = Blueprint("PageRoute", __name__)


@PageRoute.route("/")
def DefaultPage():
    return render_template("DefaultPage.html"), 200


@PageRoute.route("/Home")
def HomePage():
    return render_template("HomePage.html"), 200


@PageRoute.route("/Login")
def LoginPage():
    return render_template("LoginPage.html"), 200


@PageRoute.route("/SignUp")
def SignUpPage():
    return render_template("SignUpPage.html"), 200
