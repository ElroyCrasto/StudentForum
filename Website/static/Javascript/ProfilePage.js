
var UserProfile = new URL(location.href).searchParams.get('u');
if (UserProfile == null) {
    window.location.replace(window.location.origin + "/Home");
}
 
function GetProfile () {
    var GetReq = new XMLHttpRequest();
    GetReq.open('POST', '/api/GetProfile');
    GetReq.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    GetReq.onload = function () {
        var Response = JSON.parse(this.responseText);
        if(Response.Status == 0){
            NoUsers()
        }
        else{
        document.getElementById('username').innerHTML = Response.Profile.Username;
        document.getElementById('firstname').innerHTML = Response.Profile.FirstName;
        document.getElementById('lastname').innerHTML = Response.Profile.LastName;
        document.getElementById('year').innerHTML = Response.Profile.Year;
        document.getElementById('course').innerHTML = Response.Profile.Course;
        var d = Response.Profile.JoinedAt;
        d = d.substring(0, 16)
        document.getElementById('joinedat').innerHTML = d;
        }
    }
    GetReq.send(JSON.stringify({"Username" : UserProfile}))
}

function GetUserPost() {
    var posts = new XMLHttpRequest();
    posts.open('POST', '/api/GetUserPost');
    posts.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    posts.onload = function () {
        var Response = JSON.parse(this.responseText);
        console.log(Response);
        if(Response.Status == 0){
            Err()
        }
        else{
        Response.Posts.forEach(UserPosts);
        if (Object.keys(Response.Posts).length == 0){
            Err()
        }
    }
    }
    Payload = (JSON.stringify({"Username" : UserProfile}));
    posts.send(Payload);
}

function UserPosts(data) {
    
    //setting HTML elements
    var Post = document.createElement("div");
    Post.setAttribute("class", "forum-item");

    var Row = document.createElement("div");
    Row.setAttribute("class", "row");

    var IconDiv = document.createElement("div");
    IconDiv.setAttribute("class", "col-md-9");
    
    var InIconDiv = document.createElement("div");
    InIconDiv.setAttribute("class", "forum-icon");

    var Icon = document.createElement("div");
    Icon.setAttribute("class", "fa fa-bolt");

    var Title = document.createElement("a");
    Title.setAttribute("class", "forum-item-title");
    Title.setAttribute("href", "/Post?p="+data.ID);

    var SubTitle = document.createElement("div");
    SubTitle.setAttribute("class", "forum-sub-title");

    var PostsDiv = document.createElement("div");
    PostsDiv.setAttribute("class", "col md-1 forum-info");

    var Posts = document.createElement("span");
    Posts.setAttribute("class", "post-count");

    var SmallDiv = document.createElement("div");

    var Small = document.createElement("small");

    //Passing values in the Elements
    Title.insertAdjacentHTML("beforeend", data.Title);
    SubTitle.insertAdjacentHTML("beforeend", data.Content);
    Posts.insertAdjacentHTML("beforeend", data.Posts);
    Small.insertAdjacentText("beforeend", "Posts");
    
    //Passing all Elements in main div
    InIconDiv.insertAdjacentElement("beforeend", Icon);
    IconDiv.insertAdjacentElement("beforeend", InIconDiv);
    IconDiv.insertAdjacentElement("beforeend", Title);
    IconDiv.insertAdjacentElement("beforeend", SubTitle);
    Row.insertAdjacentElement("beforeend", IconDiv);
    PostsDiv.insertAdjacentElement("beforeend", Posts);
    PostsDiv.insertAdjacentElement("beforeend", SmallDiv);
    SmallDiv.insertAdjacentElement("beforeend",Small);
    Row.insertAdjacentElement("beforeend", PostsDiv);
    Post.insertAdjacentElement("beforeend", Row);


    //Posting it on page
    document.getElementById("body").insertAdjacentElement("beforeend", Post);

};

function Err() {
    var Post = document.createElement('div');
    Post.setAttribute('id', 'error');
    Post.setAttribute("class", "container bg-warning pt-5");

    var Msg = document.createElement("h3");
    Msg.setAttribute('class', 'err');

    Msg.insertAdjacentHTML("beforeend", "No Viewable Post");
    Post.insertAdjacentElement("beforeend", Msg);

    document.getElementById('posts').insertAdjacentElement("beforeend", Post);
}

function NoUsers() {
    var User = document.createElement('div');
    User.setAttribute('id', 'users');
    User.setAttribute("class", "container bg-primary pt-5");
    document.getElementById('details').innerHTML = "";

    var Msg = document.createElement('h2');
    Msg.setAttribute('id', 'nouser');

    Msg.insertAdjacentHTML("beforeend", "No Such User Exist's");
    User.insertAdjacentElement("beforeend", Msg);

    document.getElementById('details').insertAdjacentElement("beforeend", User);

}