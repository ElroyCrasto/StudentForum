function LoginValidate(){
    var Form = document.getElementById('loginform');
    var Username = document.getElementById('username').value;
    var Password = document.getElementById('password').value;
    var msg = document.getElementById('error');
    var regex = /\s+/;


    if (Username.match(regex) || Username == ''){
        msg.innerHTML="Please Enter Valid Username";
    }else{
        Form.submit()
    }

}