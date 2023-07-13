var Rooms = document.getElementById('Rooms');

function DisplayRooms(){
    var GetReqest = new XMLHttpRequest();
    GetReqest.open('GET', '/api/GetRoomsData');
    GetReqest.onload = function(){
        var GetData = JSON.parse(GetReqest.responseText);
        console.log(GetData);
        RenderHTML(GetData);
    };
    GetReqest.send();
};

function RenderHTML(data){
    var TitleString, DescriptionString;

    for(i=0; i<data.RoomsList.length; i++){
        TitleString = "<div id='Rooms'>" + "<H3><a href='/RoomPage?r="+data.RoomsList[i].PublicID+"'>"+data.RoomsList[i].Title+"</a></H3>";
        DescriptionString = "<p>"+data.RoomsList[i].Description+"</p>"+ "</div>";
        document.write(TitleString, DescriptionString)
    }
}