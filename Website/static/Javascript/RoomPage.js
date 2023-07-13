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
        var Status = GetData.Status;
        if (Status == 0){
            Post.insertAdjacentText("beforeend", "Error, No such Room Exists");
        }else if (Status == 2){
            Post.insertAdjacentText("beforeend", "You Do not have access to this room");
        }
        else{
            GetData.Posts.forEach(RenderHTML);
        }
    };
    var Id = new URL(location.href).searchParams.get('r');
    Payload = JSON.stringify({"PublicID": Id});
    GetReqest.send(Payload);
};


function RenderHTML(data){
    var Post = document.createElement("div");
    Post.setAttribute("id", "Post");
    var Title = document.createElement("h3");
    var Content = document.createElement("p");
    var Views = document.createElement("div");
    var User = document.createElement("span");
    var PostedAt = document.createElement("span");

    Title.insertAdjacentHTML("beforeend",data.Title);
    Content.insertAdjacentHTML("beforeend",data.Content);
    Views.insertAdjacentHTML("beforeend",data.Views);
    User.insertAdjacentHTML("beforeend",data.User);
    PostedAt.insertAdjacentHTML("beforeend",data.PostedAt);

    Post.insertAdjacentElement("beforeend",Title);
    Post.insertAdjacentElement("beforeend",Content);
    Post.insertAdjacentElement("beforeend",Views);
    Post.insertAdjacentElement("beforeend",User);
    Post.insertAdjacentElement("beforeend",PostedAt);

    document.getElementById("Posts").insertAdjacentElement("beforeend", Post);

};