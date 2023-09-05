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
     var Rooms = document.createElement("div");
     Rooms.setAttribute("class", "forum-item");
 
     var Row = document.createElement("div");
     Row.setAttribute("class", "row");

     var IconDiv = document.createElement("div");
     IconDiv.setAttribute("class", "col-md-9");
 
     var Title = document.createElement("a");
     Title.setAttribute("class", "forum-item-title");
     Title.setAttribute("href", "/Post?p="+data.PublicID);
 
     var SubTitle = document.createElement("div");
     SubTitle.setAttribute("class", "forum-sub-title");
 
     var PostsDiv = document.createElement("div");
     PostsDiv.setAttribute("class", "col md-1 forum-info");
 
     var Posts = document.createElement("span");
     Posts.setAttribute("class", "post-count");
 
     var SmallDiv = document.createElement("div");
 
     var Small = document.createElement("small");

     const d = new Date(data.PostedAt);
     var dat = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear(); 
 
 
    //Passing values to elements
     Title.insertAdjacentHTML("beforeend", data.Title);
     SubTitle.insertAdjacentHTML("beforeend", data.Content);
     Posts.insertAdjacentHTML("beforeend", data.User);
     Small.insertAdjacentText("beforeend", "Posted At: "+dat);
 
 
     //Passing elements to divs
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