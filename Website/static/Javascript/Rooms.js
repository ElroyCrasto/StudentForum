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
    var Rooms = document.createElement("div");
    Rooms.setAttribute("class", "Rooms");

    var Title = document.createElement("h3");
    Title.setAttribute("class", "Title");
    var TitleLink = document.createElement("a");
    TitleLink.setAttribute("href", "/RoomPage?r="+data.PublicID);
    TitleLink.setAttribute("class", "TitleLink");

    var Description = document.createElement("p");
    Description.setAttribute("class", "Description");

    var PostCount = document.createElement("p");
    PostCount.setAttribute("class", "Postcount");

    //Passing values to elements
    TitleLink.insertAdjacentHTML("beforeend",data.Title);
    Description.insertAdjacentHTML("beforeend",data.Description);    
    PostCount.insertAdjacentHTML("beforeend","Posts: "+data.Posts);

    //Passing all Elements in main div
    Rooms.insertAdjacentElement("beforeend",Title);
    Title.insertAdjacentElement("beforeend",TitleLink);
    Rooms.insertAdjacentElement("beforeend",Description);
    Rooms.insertAdjacentElement("beforeend",PostCount);

    //Posting it on page
    document.getElementById("Rooms").insertAdjacentElement("beforeend", Rooms);

};