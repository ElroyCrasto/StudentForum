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
        "Msg" : String, #Error message as well as Success
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

    **Success Msg with Status 1**
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
        "Msg" : String,
    }
Possible Messages
- Error Messages with Status 0
    - Username Already Exists Or Isnt a Valid Username
<br>
- Success Msg with Status 1
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
        Msg: String,
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

### GetProfile
- URL: http://localhost:5000/api/GetProfile
- Method: Post
- Cookie: Required
- Login: Required 
- Arguments:
    ```
    {
        "Username"    : String,
    }

- Response Format
    ```
    {
        Status : Integer,
        Profile: JSON { Username: String,
                        FirstName: String,
                        LastName: String,
                        Year: String,
                        Course: String,
                        Bio: String,
                        DOB: String
                      },
    }

- **Possible Responses**
    Success Response (Status:1)
    - User Data

    Error Response (Status: 0)
    - Invalid Token
    - No Such User

### GetRooms
- URL: http://localhost:5000/api/GetRoomsData
- Method: GET
- Login: Required
- Cookie: Required
- Arguments: None
- Response
    ```
    {
        "Status"  : Integer,
        "RoomsList" : List of JSON [{
                                    Title: String,
                                    Description: String,
                                    PublicID: String 
                                    }],
        "Msg" : String
    }
Possible Messages
- Error Messages with Status 0
    - Invalid Token
<br>
- Success Msg with Status 1
    - Request Successful

### GetUserPosts
- URL: http://localhost:5000/api/GetUserPosts
- Method: Post
- Login: Required
- Cookie: Required
- Arguments:
    ```
    {
        "Username"    : String,
    }
- Response
    ```
    {
        "Status"  : Integer,
        "Posts" : List of JSON [{
                                    Title: String,
                                    Content: String,
                                    ID : String,
                                    PostedAt : String (DATE)
                                    }],

        "Msg" : String
    }
Possible Messages
- Error Messages with Status 0
    - Invalid Token
    - No Such User Exists
<br>
- Success Msg with Status 1
    - Request Successful


### GetRoomPosts
- URL: http://localhost:5000/api/GetUserPosts
- Method: Post
- Login: Required
- Cookie: Required
- Arguments:
    ```
    {
        "PublicID"    : String,
    }
- Response
    ```
    {
        "Status"  : Integer,
        "Posts" : List of JSON [{   "Title":String,
                                    "Content":String,
                                    "Views":int,
                                    "PublicID": String,
                                    "User": String,
                                    "PostedAt": Date,
                                    "Type": String}],

        "Msg" : String
    }
Possible Messages
- Error Messages with Status 0
    - Invalid Token
    - No Such User Exists
<br>
- Success Msg with Status 1
    - Request Successful

### GetUserPosts
- URL: http://localhost:5000/api/GetPostData
- Method: Post
- Login: Required
- Cookie: Required
- Arguments:
    ```
    {
        "PublicID"    : String,
    }
- Response
    ```
    {   
        "Status":1,
        "Title": String,
        "Content": String,
        "Views": String,
        "PublicID":String,
        "User": String,
        "PostedAt":String,
        "Type": String,
        "Msg": String
    }

Possible Messages
- Error Messages with Status 0
    - Invalid Token
<br>

- Error Message with Status 2    
    - You Do not have access to this post
<br>

- Success Msg with Status 1
    - Request Successful
