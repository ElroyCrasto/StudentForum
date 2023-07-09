
    var request = new XMLHttpRequest();
    request.open("GET", "/api/GetRoomsData");
    request.onload = function() {
        var response = JSON.parse(request.responseText);
        response.RoomsList.forEach(renderroom);
    };
    request.send();


function renderroom(data){

    var htmlstring = "";
    var postroom = data.Title;
    var option = document.createElement("option");
    option.setAttribute("value", postroom);
    option.innerText = postroom;
   document.getElementById("RoomName").appendChild(option);
};

document.getElementById("btn").addEventListener("click", function() {
    var title = document.getElementById("Title").value.trim();
    var content = document.getElementById("Content").value.trim();
    var type = document.getElementById("Type").value;
    var room = document.getElementById("RoomName").value;
    var pattern = /^[a-zA-Z!?.,()]+$/;

    if (title == ""){
      alert("No empty Title allowed!");
    }else if(title.match(pattern)){
      alert("No speacial characters allowed in title!")
    }else if(content == ""){
      alert("No empty content allowed");
    }else if(content.match(pattern)){
      alert("No speacial characters allowed in content!")
    }else if( type == "Default"){
      alert("Please select a question type");
    };

  var data = {
    Title: title,
    Content: content,
    Type: type,
    RoomName: room
  };
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/MakePost");
  xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhr.onload = function() {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      if(response.Status == 1){
      alert("Post Created Successfully!!!");
      }else{
        console.log(response.Msg);
      }
  };
  xhr.send(JSON.stringify(data));
});  