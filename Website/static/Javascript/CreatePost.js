
    var request = new XMLHttpRequest();
    request.open("GET", "/api/GetRoomsData");
    request.onload = function() {
        var response = JSON.parse(request.responseText);
        response.RoomsList.forEach(renderroom);
    };
    request.send();

    function err() {
        $(".alert").fadeOut();
    }

    function ErrorDisplay(msg) {
        $("#alert").show();
        document.getElementById('msgs').innerHTML = msg;    
    }

function renderroom(data){

    var postroom = data.Title;
    var option = document.createElement("option");
    option.setAttribute("value", postroom);
    option.innerText = postroom;
   document.getElementById("RoomName").appendChild(option);
};

document.getElementById("btn").addEventListener("click", function() {
    var title = document.getElementById("Title").value;
    var content = document.getElementById("Content").value;
    var type = document.getElementById("Type").value;
    var room = document.getElementById("RoomName").value;

    if (title.trim() === "") {
        ErrorDisplay("Post's Title cant be empty!");
    } else if (content.trim() === "") {
        ErrorDisplay("Post's Description cant be empty!");
    } else if (type === "Default") {
        ErrorDisplay("Please select your question type");
    }else{


  var data = {
    Title: title,
    Content: content,
    Type: type,
    RoomName: room
  };

  var makepost = new XMLHttpRequest();
  makepost.onreadystatechange = function(){
    if(makepost.readyState!=4){
        $(document).ready(function(){
            $("#loading").show();
        });
    }else{
        $(document).ready(function(){
            $("#loading").hide();
    });
}
};
  makepost.open("POST", "/api/MakePost");
  makepost.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  makepost.onload = function() {
      var response = JSON.parse(makepost.responseText);
      console.log(response);
      if(response.Status == 1){
      //alert("Post Created Successfully!!!");
      $('#spinner-div').removeClass("hidden");            
      $('#spinner-div').addClass("show");
      window.location.replace(window.location.origin + "/Rooms");
      }
      else{
        console.log(response.Msg);
      }
  };
  makepost.send(JSON.stringify(data));

}}); 
