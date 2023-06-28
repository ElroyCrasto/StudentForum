from flask import Blueprint, render_template
import string, random

# TokenGeneration Function
def TokenGeneration():
    Token = ''.join(random.choices(string.ascii_uppercase +
                                           string.digits + string.ascii_lowercase, k=15))
    Check = User.query.filter_by(AuthToken=Token).first()
    if Check:
        return TokenGeneration()
    else:
        return Token

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
