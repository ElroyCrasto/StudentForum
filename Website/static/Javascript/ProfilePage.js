
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
    posts.send(JSON.stringify({"Username" : UserProfile}))
}

function UserPosts(data) {
    var Post = document.createElement('div');
    Post.setAttribute("id", "Post"); 
    Post.setAttribute("class", "container bg-warning pt-5");
    
    var Title = document.createElement("h3");
    Title.setAttribute('class', 'title')
    
    var TitleLink = document.createElement("a");
    TitleLink.setAttribute('class', 'titlelink')
    TitleLink.setAttribute("href", "/Post?p="+data.ID);
    
    var Content = document.createElement("p");
    Content.setAttribute('class', 'content')
    
    var PostedAt = document.createElement("span");
    PostedAt.setAttribute('class', 'postedat')

    TitleLink.insertAdjacentHTML("beforeend",data.Title);
    Content.insertAdjacentHTML("beforeend",data.Content);
    PostedAt.insertAdjacentHTML("beforeend",data.PostedAt);

    Post.insertAdjacentElement("beforeend",Title);
    Title.insertAdjacentElement("beforeend",TitleLink);
    Post.insertAdjacentElement("beforeend",Content); 
    Post.insertAdjacentElement("beforeend",PostedAt);

    document.getElementById('posts').insertAdjacentElement("beforeend", Post);

};

function Err() {
    var Post = document.createElement('div');
    Post.setAttribute('id', 'error');
    Post.setAttribute("class", "container bg-warning pt-5");

    var Msg = document.createElement("h3");
    Msg.setAttribute('class', 'err')

    Msg.insertAdjacentHTML("beforeend", "No Viewable Post")
    Post.insertAdjacentElement("beforeend", Msg)

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