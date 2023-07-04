
var SpecialCharacters = /^[!@#$%^&*()_+\-=\[\]{};':" \\|,.<>\/?]*$/;
var Numbers = /^[1234567890]*$/;
var CharactersAndNumbers = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?1234567890]*$/;
var AlphabetsNumbersAndCharacters = /^[a-zA-Z1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
var Alphabets = /^[A-Za-z]+$/;
var AlphaNumeric = /^[A-Za-z0-9]+$/; 
var Space = " ";

function SignUpFormValidation() {

    var UserNameCheck = UserNameValidation();
    var FirstName = document.getElementById('firstname'); //Firstname validation starts here
    var FirstNameCheck = CheckValidation(FirstName);                           //Firstname validation ends her
    var LastName = document.getElementById('lastname');  //Lastname validation starts here
    var LastNameCheck = CheckValidation(LastName);                           //Lastname validation ends here
    var PassWordCheck = PassWordValidation();
    
    if (UserNameCheck && FirstNameCheck && LastNameCheck && PassWordCheck) {
        console.log("Validation Successfull");
        
        SendData();
    } 

}

function CheckValidation(VariableName){
    if (VariableName.value == "") {
        ErrorDisplay((VariableName.attributes['name'].value)+ " Cannot be empty");
        return false;
    }
    else if (VariableName.value.match(SpecialCharacters)) {
        ErrorDisplay((VariableName.attributes['name'].value)+ "cannot contain Special characters");
        return false;
    }
    else if(VariableName.value.match(Numbers)) {
        ErrorDisplay((VariableName.attributes['name'].value)+ "cannot contain numbers");
        return false;
    }
    else if(VariableName.value.match(CharactersAndNumbers)) {
        ErrorDisplay((VariableName.attributes['name'].value)+ "cannot contain Numbers and Special Characters");
        return false;
    }
    else if(!(VariableName.value.match(Alphabets))) {
        ErrorDisplay("No Numbers or Special Characters Allowed with" +(VariableName.attributes['name'].value));
        return false;
    }
    else if(VariableName.value.match(Space)) {
        ErrorDisplay("No white spaces allowed in between");
        return false;
    }
    else {
        console.log("No errors in" +(VariableName.attributes['name'].value));
        return true;
    }
}

function UserNameValidation(){
    // Username Validation Starts Here
    var UserName = document.getElementById('username').value;
    if (UserName == "") {
        ErrorDisplay("Username Cannot be Empty");
    }
    else if(!(UserName.match(AlphaNumeric))){
        ErrorDisplay("no Special characters allowed with username");
    }
    else if(UserName.match(Space)) {
        ErrorDisplay("No white spaces allowed in between");
        return false;
    }
    else {
        console.log("No errors in Username");
        return true;
    }                                                             //Username Validation Completes Here
}

function PassWordValidation(){
    var PassWord = document.getElementById('password').value; //Password validation starts here
    var ConfirmPassword = document.getElementById('confirm_password').value;
    if (PassWord == "") { ErrorDisplay("please enter password");
    return false;}
    else if(PassWord.length < 5) { ErrorDisplay("password should atleast contain 5 characters");
    return false;}
    else if(ConfirmPassword != PassWord) {
        alert("Passwords doesnt match")
    }
    else { console.log("no errors in password");
    return true;}              //Password validation ends here  
}

function ErrorDisplay(msg) {
    //document.getElementById('error').innerHTML=msg;
    console.log(msg);
}

var ToSend={   
    Username : "yash12345", 
    FirstName: "faisal", 
    LastName : "khan", 
    DOB      : "2004-12-28",
    Password : "faisal123", 
    Year     : "SY", 
    Course   : "CS", 
    SecurityQuestion: "Question", 
    SecurityAnswer: "Helllo"
}
var JsonString = JSON.stringify(ToSend);

function SendData() {
    var _UserName = document.getElementById('username').value;
    var _FirstName = document.getElementById('firstname').value;
    var _LastName = document.getElementById('lastname').value;
    var _Dob = document.getElementById('dob').value;
    var _PassWord = document.getElementById('password').value;
    var _Year = YearRadioValue();
    var _Course = CourseRadioValue();
    var _SecurityQuestion = "Question";
    var _SecurityAnswer = "Answer";
    
    function YearRadioValue() {
        var _Fy = document.getElementById('YearFy');
        var _Sy = document.getElementById('YearSy');
        var _Ty = document.getElementById('YearTy');
        if (_Fy.checked) {
            return "FY"
        }
        else if (_Sy.checked) {
            return "SY"
        }
        else if (_Ty.checked) {
            return "TY"
        }
    }

    function CourseRadioValue() {
        var _CS = document.getElementById('CS');
        var _IT = document.getElementById('IT');
        if (_CS.checked) {
            return "CS"
        }
        else if (_IT.checked)  {
            return "IT"
        }
    }

    payload = {
        Username : _UserName, 
        FirstName: _FirstName, 
        LastName : _LastName, 
        DOB      : _Dob,
        Password : _PassWord, 
        Year     : _Year, 
        Course   : _Course, 
        SecurityQuestion:_SecurityQuestion, 
        SecurityAnswer: _SecurityAnswer
    }

    var OurRequest = new XMLHttpRequest();
    OurRequest.open('POST','http://localhost:5000/api/SignUp',true)
    OurRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    OurRequest.onload = function() {
        var Response = JSON.parse(this.responseText);
        console.log(Response.Message);
        if (Response.Status == 1) {
            alert("User Registered Successfully")
        }
        else {
            alert(Response.Message)
        }
    }
    OurRequest.send(JSON.stringify(payload));
}

function CheckUserName() {
    var OurUserName = new XMLHttpRequest();
    OurUserName.open('POST', 'http://localhost:5000/api/UsernameCheck', true);
    //OurUserName.setRequestHeader("Content-Type", "applicaton/json; charset=UTF-8");
    OurUserName.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    OurUserName.onload = function() {
        var Reply = JSON.parse(this.responseText);
        console.log(Reply);
        console.log(Reply.Message);
        if (Reply.Status == 0) {
            console.log("Username already taken ");
        }
        else {
            console.log("Username not taken");
        }
    }
    OurUserName.send(JSON.stringify({Username: document.getElementById('username').value}));
}