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
    //setting HTML elements
   var Rooms = '<div class="forum-item">'+
   '<div class="row">'+'<div class="col-md-9">'+
   '<div class="forum-icon">'+'<i class="fa fa-bolt"></i>'+'</div>'+
   '<a href='+'"'+'/RoomPage?r='+data.PublicID+'"'+'class="forum-item-title">'+data.Title+
   '</a><div class="forum-sub-title">'+data.Description+'</div></div>'+
   '<div class="col-md-1 forum-info">'+'<span class="views-number">'+'0'+'</span>'+
   '<div>'+'<small>' + 'Views' +'</small>'+'</div>'+'</div>'+
   '<div class="col-md-1 forum-info">'+'<span class="views-number">'+data.Posts+'</span>'+'<div>'+'<small>'+'Posts'+'</small>'+
   '</div>'+'</div>'+'</div>'+'</div>'+'<br>'
    //Posting it on page
    document.getElementsByClassName("ibox-content forum-container")[0].insertAdjacentHTML("beforeend", Rooms);

};