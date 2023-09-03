function DisplayRooms(){
    var GetReqest = new XMLHttpRequest();
    GetReqest.open('GET', '/api/GetRoomsData');
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
        GetData.RoomsList.forEach(RenderHTML);
    };
    GetReqest.send();
};

function RenderHTML(data){
    //Displaying total posts available
    var TotalPosts = document.getElementById("total-posts");
    TotalPosts.innerText = Number(TotalPosts.innerText) + data.Posts;

    //setting HTML elements
    var Rooms = document.createElement("div");
    Rooms.setAttribute("class", "forum-item");

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

    var SubTitle = document.createElement("div");
    SubTitle.setAttribute("class", "forum-sub-title");

    var PostsDiv = document.createElement("div");
    PostsDiv.setAttribute("class", "col md-1 forum-info");

    var Posts = document.createElement("span");
    Posts.setAttribute("class", "post-count");

    var SmallDiv = document.createElement("div");

    var Small = document.createElement("small");


   //Passing values to elements
    Title.insertAdjacentHTML("beforeend", data.Title);
    SubTitle.insertAdjacentHTML("beforeend", data.Description);
    Posts.insertAdjacentHTML("beforeend", data.Posts);
    Small.insertAdjacentText("beforeend", "Posts");


    //Passing elements to divs
    InIconDiv.insertAdjacentElement("beforeend", Icon);
    IconDiv.insertAdjacentElement("beforeend", InIconDiv);
    IconDiv.insertAdjacentElement("beforeend", Title);
    IconDiv.insertAdjacentElement("beforeend", SubTitle);
    Row.insertAdjacentElement("beforeend", IconDiv);
    PostsDiv.insertAdjacentElement("beforeend", Posts);
    PostsDiv.insertAdjacentElement("beforeend", SmallDiv);
    SmallDiv.insertAdjacentElement("beforeend",Small);
    Row.insertAdjacentElement("beforeend", PostsDiv);
    Rooms.insertAdjacentElement("beforeend", Row);


    //Posting it on page
    document.getElementsByClassName("ibox-content forum-container")[0].insertAdjacentElement("beforeend", Rooms);
    

};