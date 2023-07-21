function ShowPostDetails(){
    var GetPost = new XMLHttpRequest();
    var Post = document.getElementById("Posts");
    GetPost.open('POST', '/api/GetUserPost');
    GetPost.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    GetPost.onreadystatechange = function(){
        if(GetPost.readyState!=4){
            $(document).ready(function(){
                $("#loading").show();
            });
        }else{
            $(document).ready(function(){
                $("#loading").hide();
        });
    }
    }
    GetPost.onload = function(){
        var GetData = JSON.parse(GetPost.responseText);
        console.log(GetData);
        var Status = GetData.Status;
        if (Status == 0){
            Post.insertAdjacentText("beforeend", GetData.Msg);
        }
        else{
            GetData.Posts.forEach(RenderHTML);
        }
        
    };
    var User = new URL(location.href).searchParams.get('u');
    Payload = JSON.stringify({"Username": User});
    GetPost.send(Payload);
};


function RenderHTML(data){
    var Post = document.createElement("div");
    Post.setAttribute("id", "Post");
    var title = document.createElement("h3");
    var content = document.createElement("p");
    var postedat = document.createElement("span");
    var link = document.createElement("a");
    link.setAttribute("id", "link");
    link.setAttribute("href", ("/Post?p=" + data.ID));
    var button = document.createElement("button");
    button.setAttribute("id", "btn");
    button.setAttribute("onclick","PostDelete('"+data.ID+"')");
    


    link.insertAdjacentHTML("beforeend",data.Title);
    content.insertAdjacentHTML("beforeend",data.Content);
    postedat.insertAdjacentHTML("beforeend",data.PostedAt);
    button.innerText="Delete";

    Post.insertAdjacentElement("beforeend",link);
    Post.insertAdjacentElement("beforeend",content);
    Post.insertAdjacentElement("beforeend",postedat);
    Post.insertAdjacentElement("beforeend",button);

    document.getElementById("Posts").insertAdjacentElement("beforeend", Post);

};

function PostDelete(data){
    var DelReq = new XMLHttpRequest;
    DelReq.open('POST', '/api/DeletePost');
    DelReq.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    DelReq.onload = function(){
        var Del = JSON.parse(DelReq.responseText);
        console.log(Del);
        var Status = Del.Status;
        if (Status == 0){
            alert(Del.Msg);
        }else if (Status == 2){
            alert(Del.Msg);
        }
        else{
           alert("Post Successfully Deleted!");
           location.reload();
        }
    };
    Payload = JSON.stringify({"PublicID": data});
    DelReq.send(Payload);
};