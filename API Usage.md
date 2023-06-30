# APIs

### SignUp
- URL: http://localhost:5000/api/SignUp
- Method: Post
- Arguments:
    ```
    {   
        (Variable  : DataType)
        "Username" : String, #(No Special Charectors)
        "FirstName": String, #(No Special Charectors)
        "LastName" : String, #(No Special Charectors)
        "DOB"      : String, #(YYYY-MM-DD Format)
        "Password" : String, 
        "Year"     : String, #(Valid Options [FY,SY,TY]) 
        "Course"   : String, #(Valid Options [CS, IT])
        "RollNum"  : Integer,
        "SecurityQuestion" : String, #(Valid Options [Question])
        "SecurityAnswer"   : String,
    }
- Response Format
    ```
    {
        "Status" : Integer, #(Valid Options [0, 1])
        "Message" : String, #Error message as well as Success
    }
- Possible Messages
    **Error Messages with Status 0**
    - Username Cannot Contain Special Charecters
    - Invalid Username
    - FirstName/LastName Cannot Contain Special Charecters
    - Invalid DOB
    - Invalid Year
    - Invalid Course
    - Invalid RollNumber
    - Invalid SecurityQuestion
    - An Error Occured While Creating User

    **Success Message with Status 1**
    - User Registered Successfully 

### UsernameCheck
- URL: http://localhost:5000/api/UsernameCheck
- Method: Post
- Arguments:
    ```
    {   
        (Variable  : DataType)
        "Username" : String, (No Special Charectors)
    }
- Response
    ```
    {
        "Status"  : Integer,
        "Message" : String,
    }
Possible Messages
- Error Messages with Status 0
    - Username Already Exists Or Isnt a Valid Username
<br>
- Success Message with Status 1
    - Username is Available

### MakePost
- URL: http://localhost:5000/api/MakePost
- Method: Post
- Cookie: Required
- Login: Required 
- Arguments:
    ```
    {
        "Title"    : String,
        "Type"     : String, # Options [General/Question]
        "Content"  : String,
        "RoomName" : String (Must Be a valid Room)
    }

- Response Format
    ```
    {
        Status : Integer,
        Message: String,
    }

- **Possible Responses**
    Success Response (Status:1)
    - Post Created Successfully!

    Error Response (Status: 0)
    - Invalid Token
    - Invalid Post Type
    - Room Does Not Exist!
    - An Error Occured!

    Forbidden Response (Status: 2)
    - You Do Not Have Access to Post in This Room