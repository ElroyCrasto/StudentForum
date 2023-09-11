function LoginValidate(){
    var Form = document.getElementById('loginform');
    var Username = document.getElementById('Username').value;
    var msg = document.getElementById('error');
    var regex = /\s+/;

    if (Username.match(regex) || Username == ''){
        msg.innerHTML="Please Enter Valid Username";
    }else{
        $('#spinner-div').removeClass("hidden");            
        $('#spinner-div').addClass("show");
        Form.submit()
    }
}

function ShowPassword(){
    var Password = document.getElementById('Password');
    if (Password.type == "password"){
        Password.type = "text";
    }else{
        Password.type = "password";
    }
}

function err() {
    $(".alert").fadeOut();
}