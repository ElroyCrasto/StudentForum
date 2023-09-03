
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
    var DateCheck = DateValue();
    var YearCheck = YearRadioResult();
    var CourseCheck = CourseRadioResult();
    var PassWordCheck = PassWordValidation();
    var SecurityQuestions = SecurityQuestion();
    var SecurityAnswers = SecurityAnswer();

    if (UserNameCheck && FirstNameCheck && LastNameCheck && DateCheck && YearCheck && CourseCheck && PassWordCheck && SecurityAnswers && SecurityQuestions) {
        $('#spinner-div').removeClass("hidden");
        $('#spinner-div').addClass("show");
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
        return true;
    }                                                             //Username Validation Completes Here
}

function DateValue() {
    var date = document.getElementById('dob').value;
    if (date == "") {
        ErrorDisplay("Please Enter your Date-of-Birth");
        return false;
    }
    else{
        return true;
    }
}

function YearRadioResult() {
    var FY = document.getElementById('year1');
    var SY = document.getElementById('year2');
    var TY = document.getElementById('year3');
    if (FY.checked) {
        return true;
    }
    else if (SY.checked) {
        return true;
    }
    else if(TY.checked){
        return true;
    }
    else {
        ErrorDisplay("Please Select your Academic Year");
        return false;
    }
}

function CourseRadioResult() {
    var _CS = document.getElementById('option1');
    var _IT = document.getElementById('option2');
    if (_CS.checked) {
        return true;
    }
    else if (_IT.checked) {
        return true;
    }
    else {
        ErrorDisplay("Please Select your Course");
        return false;
    }
}

function YearRadioValue() {
    var FY = document.getElementById('year1');
    var SY = document.getElementById('year2');
    var TY = document.getElementById('year3');
    if (FY.checked) {
        return "FY";
    }
    else if (SY.checked) {
        return "SY";
    }
    else if(TY.checked){
        return "TY";
    }
    else {
        null
    }
}

function CourseRadioValue() {
    var _CS = document.getElementById('option1');
    var _IT = document.getElementById('option2');
    if (_CS.checked) {
        return "CS";
    }
    else if (_IT.checked) {
        return "IT";
    }
    else {
       null
    }
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
        ErrorDisplay("Passwords doesnt match")
    }
    else {
        return true;
    } // Password validation ends here  
}

function SecurityAnswer() { // This Function Validates the Security Answers 
    var answers = document.getElementById('answer').value.trim();
    if (answers == "") { ErrorDisplay("Answer cannot be Empty"); return false; }
    else { return true; }
}

function SecurityQuestion() { // This Function Checks if any Question is Selected or Not
    var question = document.getElementById('questions').value;
    if (question == "") { ErrorDisplay("Please select a Question"); return false; }
    else { return true; }
}

let initialResult = null;
function ErrorDisplay(msg) {
    $("#alert").show();
    document.getElementById('msgs').innerHTML = msg;
    for (let i = 0; i < 10; i++) {
        let currentResult = i;
        if (initialResult === null) {
            initialResult = currentResult;
        }
    }
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
        if (Response.Status == 1) {
            $('#spinner-div').removeClass("show");
            $('#spinner-div').addClass("hidden");
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
    OurUserName.open('POST', '/api/UsernameCheck', true);
    OurUserName.setRequestHeader("Content-Type", "application/json; charset=UTF-8")
    OurUserName.onload = function () {
        var Reply = JSON.parse(this.responseText);
        if (Reply.Status == 0) {
            $("#cross").show();
            $("#tick").hide();
        }
        else {
            $("#cross").hide();
            $("#tick").show();
        }
    }
    OurUserName.send(JSON.stringify({ Username: document.getElementById('username').value }));
}

function group1() {
    $("#grp1").hide();
    $("#grp2").show();
}

function group2n() {
    $("#grp2").hide();
    $("#grp3").show();
}

function group2p() {
    $("#grp2").hide();
    $("#grp1").show();
}

function group3p() {
    $("#grp3").hide();
    $("#grp2").show();
}

function err() {
    $(".alert").fadeOut();
}
