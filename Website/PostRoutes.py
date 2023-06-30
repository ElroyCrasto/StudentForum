from flask import Blueprint, render_template
from flask_login import login_required
from . import Database

PostRoute = Blueprint("PostRoute", __name__)

@login_required
@PostRoute.route("/PostUpload")
def CreatePost():
    return render_template("CreatePost.html")

@login_required
@PostRoute.route("/Post")
def ShowPost(Identifier):
    return render_template("Post.html")