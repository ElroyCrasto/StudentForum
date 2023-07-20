
var SpecialCharacters = /^[!@#$%^&*()_+\-=\[\]{};':" \\|,.<>\/?]*$/;
var Numbers = /^[1234567890]*$/;
var CharactersAndNumbers = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?1234567890]*$/;
var AlphabetsNumbersAndCharacters = /^[a-zA-Z1234567890!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
var Alphabets = /^[A-Za-z]+$/;
var AlphaNumeric = /^[A-Za-z0-9]+$/;
var Space = " ";

function SignUpFormValidation() {
    //This Function Validates the Form and Sends Data to their respective Api's
    var UserNameCheck = UserNameValidation();
    var FirstName = document.getElementById('firstname'); //Firstname validation starts here
    var FirstNameCheck = CheckValidation(FirstName);                           //Firstname validation ends her
    var LastName = document.getElementById('lastname');  //Lastname validation starts here
    var LastNameCheck = CheckValidation(LastName);                           //Lastname validation ends here
    var PassWordCheck = PassWordValidation();
    var SecurityQuestions = SecurityQuestion();
    var SecurityAnswers = SecurityAnswer();

    if (UserNameCheck && FirstNameCheck && LastNameCheck && PassWordCheck && SecurityAnswers && SecurityQuestions) {
        $('#spinner-div').removeClass("hidden");
        $('#spinner-div').addClass("show");
        console.log("Validation Successfull");
        SendData();
    }
}

function CheckValidation(VariableName) {
    //This Function Validates the Firstname and the Lastname 
    if (VariableName.value == "") {
        ErrorDisplay((VariableName.attributes['name'].value) + " Cannot be empty");
        return false;
    }
    else if (VariableName.value.match(SpecialCharacters)) {
        ErrorDisplay((VariableName.attributes['name'].value) + " cannot contain Special characters");
        return false;
    }
    else if (VariableName.value.match(Numbers)) {
        ErrorDisplay((VariableName.attributes['name'].value) + " cannot contain numbers");
        return false;
    }
    else if (VariableName.value.match(CharactersAndNumbers)) {
        ErrorDisplay((VariableName.attributes['name'].value) + " cannot contain Numbers and Special Characters");
        return false;
    }
    else if (!(VariableName.value.match(Alphabets))) {
        ErrorDisplay("No Numbers or Special Characters Allowed with " + (VariableName.attributes['name'].value));
        return false;
    }
    else if (VariableName.value.match(Space)) {
        ErrorDisplay("No white spaces allowed in between");
        return false;
    }
    else {
        console.log("No errors in " + (VariableName.attributes['name'].value));
        return true;
    }
}

function UserNameValidation() {
    // This Function Validates the UserName
    var UserName = document.getElementById('username').value;
    if (UserName == "") {
        ErrorDisplay("Username Cannot be Empty");
    }
    else if (!(UserName.match(AlphaNumeric))) {
        ErrorDisplay("no Special characters allowed with username");
    }
    else if (UserName.match(Space)) {
        ErrorDisplay("No white spaces allowed in between");
        return false;
    }
    else if(UserName.length < 8) {
        ErrorDisplay("Length of username has to be greater than 8");
        return false;
    }
    else {
        console.log("No errors in Username");
        return true;
    }                                                             //Username Validation Completes Here
}

function PassWordValidation() { // Password validation starts here
    var PassWord = document.getElementById('password').value; 
    var ConfirmPassword = document.getElementById('confirm_password').value;
    if (PassWord == "") {
        ErrorDisplay("please enter password");
        return false;
    }
    else if (PassWord.length < 5) {
        ErrorDisplay("password should atleast contain 5 characters");
        return false;
    }
    else if (ConfirmPassword != PassWord) {
        alert("Passwords doesnt match")
    }
    else {
        console.log("no errors in password");
        return true;
    } // Password validation ends here  
}

function SecurityAnswer() { // This Function Validates the Security Answers 
    var answers = document.getElementById('answer').value.trim();
    if (answers == "") { ErrorDisplay("Answer cannot be Empty"); return false; }
    else { console.log("no errors in answers"); return true; }
}

function SecurityQuestion() { // This Function Checks if any Question is Selected or Not
    var question = document.getElementById('questions').value;
    if (question == "none") { ErrorDisplay("Please select a Question"); return false; }
    else { console.log("no errors in security question"); return true; }
}

function ErrorDisplay(msg) {
    console.log(msg);
}

function SendData() {
    // This Function Sends the Data to their Respective
    var _UserName = document.getElementById('username').value;
    var _FirstName = document.getElementById('firstname').value;
    var _LastName = document.getElementById('lastname').value;
    var _Dob = document.getElementById('dob').value;
    var _PassWord = document.getElementById('password').value;
    var _Year = YearRadioValue();
    var _Course = CourseRadioValue();
    var _SecurityQuestion = document.getElementById('questions').value;
    var _SecurityAnswer = document.getElementById('answer').value;

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
        else if (_IT.checked) {
            return "IT"
        }
    }

    payload = {
        Username: _UserName,
        FirstName: _FirstName,
        LastName: _LastName,
        DOB: _Dob,
        Password: _PassWord,
        Year: _Year,
        Course: _Course,
        SecurityQuestion: _SecurityQuestion,
        SecurityAnswer: _SecurityAnswer
    }

    
    var OurRequest = new XMLHttpRequest();
    OurRequest.open('POST', 'http://localhost:5000/api/SignUp', true)
    OurRequest.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    OurRequest.onload = function () {
        var Response = JSON.parse(this.responseText);
        console.log(Response.Msg);
        if (Response.Status == 1) {
            $('#spinner-div').removeClass("show");
            $('#spinner-div').addClass("hidden");
            setTimeout(function() {
                alert(Response.Msg);
            },20)
            window.location.replace(window.location.origin + "/Login");
        }
        else {
            $('#spinner-div').removeClass("show");
            $('#spinner-div').addClass("hidden");
            setTimeout(function() {
                alert(Response.Msg);
            },20)
        };
    }
    OurRequest.send(JSON.stringify(payload)); // SendData() Function Ends Here
}

function CheckUserName() { // This Function Checks If the username entered is available or not
    var OurUserName = new XMLHttpRequest();
    var tick = document.getElementById('checker');
    OurUserName.open('POST', 'http://localhost:5000/api/UsernameCheck', true);
    OurUserName.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    OurUserName.onload = function () {
        var Reply = JSON.parse(this.responseText);
        console.log(Reply);
        console.log(Reply.Msg);
        if (Reply.Status == 0) {
            $("#cross").show();
            $("#tick").hide();
            console.log("Username already taken ");
        }
        else {
            $("#cross").hide();
            $("#tick").show();
            console.log("Username not taken");
        }
    }
    OurUserName.send(JSON.stringify({ Username: document.getElementById('username').value }));
}