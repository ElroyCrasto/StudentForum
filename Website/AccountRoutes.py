from flask import Blueprint, render_template
from flask_login import login_required
AccountRoute = Blueprint("AccountRoute", __name__)

@AccountRoute.route("/Profile")
@login_required
def ProfilePage():
    return render_template("ProfilePage.html")
