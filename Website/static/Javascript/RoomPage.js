function ShowRoomsDetails(){
    var GetReqest = new XMLHttpRequest();
    var Post = document.getElementById("Posts");
    GetReqest.open('POST', '/api/GetRoomPosts');
    GetReqest.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    GetReqest.onreadystatechange = function(){
        if(GetReqest.readyState!=4){
            $(document).ready(function(){
                $("#loading").show();
            });
        }else{
            $(document).ready(function(){
                $("#loading").hide();
        });
    }
}
    GetReqest.onload = function(){
        var GetData = JSON.parse(GetReqest.responseText);
        console.log(GetData);
        console.log(GetData.PostCount);
        var Status = GetData.Status;
        if (Status == 0){
            Post.insertAdjacentText("beforeend", "Error, No such Room Exists");
        }else if (Status == 2){
            Post.insertAdjacentText("beforeend", "You Do not have access to this room");
        }
        else{
            if (GetData.PostCount == 0){
                document.getElementById("Posts").innerHTML = "There are No posts in this room!";
            }else{
                GetData.Posts.forEach(RenderHTML);
            }
        }
    };
    var Id = new URL(location.href).searchParams.get('r');
    Payload = JSON.stringify({"PublicID": Id});
    GetReqest.send(Payload);
};


function RenderHTML(data){
    //setting HTML elements
    var Post = document.createElement("div");
    Post.setAttribute("id", "Post");

    var Title = document.createElement("h3");
    Title.setAttribute("class", "title");

    var TitleLink = document.createElement("a");
    TitleLink.setAttribute("href", "/Post?p="+data.PublicID);
    TitleLink.setAttribute("class", "TitleLink");

    var Content = document.createElement("p");
    Content.setAttribute("class", "content");

    var Views = document.createElement("div");
    Views.setAttribute("class", "views");

    var User = document.createElement("a");
    User.setAttribute("href", "/Profile?u="+data.User);
    User.setAttribute("class", "username");

    var PostedAt = document.createElement("span");
    PostedAt.setAttribute("class", "postedat");

    //Passing values in the Elements
    TitleLink.insertAdjacentHTML("beforeend",data.Title);
    Content.insertAdjacentHTML("beforeend",data.Content);
    Views.insertAdjacentHTML("beforeend",data.Views);
    User.insertAdjacentHTML("beforeend",data.User);
    PostedAt.insertAdjacentHTML("beforeend",data.PostedAt);
    
    //Passing all Elements in main div
    Post.insertAdjacentElement("beforeend",Title);
    Title.insertAdjacentElement("beforeend",TitleLink);
    Post.insertAdjacentElement("beforeend",Content);
    Post.insertAdjacentElement("beforeend",Views);
    Post.insertAdjacentElement("beforeend",User);
    Post.insertAdjacentElement("beforeend",PostedAt);

    //Posting it on page
    document.getElementById("Posts").insertAdjacentElement("beforeend", Post);

};