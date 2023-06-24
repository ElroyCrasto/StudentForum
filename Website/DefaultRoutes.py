from flask import Blueprint, render_template

Default = Blueprint("Default", __name__)


@Default.route("/")
def DefaultPage():
    return render_template("DefaultPage.html"), 200
