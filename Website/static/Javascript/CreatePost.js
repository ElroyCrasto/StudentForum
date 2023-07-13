
    var request = new XMLHttpRequest();
    request.open("GET", "/api/GetRoomsData");
    request.onload = function() {
        var response = JSON.parse(request.responseText);
        response.RoomsList.forEach(renderroom);
    };
    request.send();


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
    var pattern = /^[a-zA-Z0-9 ,.\?\(\)!]+$/;

    if (title.trim() === "") {
        alert("No empty Title allowed!");
    } else if (!pattern.test(title)) {
        alert("Only letters, digits, spaces, and the characters , . ? ( ) ! are allowed in the title!");
    } else if (content.trim() === "") {
        alert("No empty content allowed!");
    } else if (!pattern.test(content)) {
        alert("Only letters, digits, spaces, and the characters , . ? ( ) ! are allowed in the content!");
    } else if (type === "Default") {
        alert("Please select a question type");
    };


  var data = {
    Title: title,
    Content: content,
    Type: type,
    RoomName: room
  };
  
  var makepost = new XMLHttpRequest();
  makepost.open("POST", "/api/MakePost");
  makepost.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  makepost.onload = function() {
      var response = JSON.parse(makepost.responseText);
      console.log(response);
      if(response.Status == 1){
      alert("Post Created Successfully!!!");
      }else{
        console.log(response.Msg);
      }
  };
  makepost.send(JSON.stringify(data));
}); 