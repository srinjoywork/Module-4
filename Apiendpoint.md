# **API DOCUMENTATION M-4 TECH BLOG**

# **Auth API Documentation**

Base URL: `/api/auth`

## **Endpoints**

---

### **1\. Register a New User**

* **Endpoint:** `POST /register`

* **Description:** Registers a new user by creating an account with a username, email, and password.

**Request Body:**

 json   
`{`  
  `"username": "string (required)",`  
  `"email": "string (required)",`  
  `"password": "string (required)"`  
`}`

**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User registered successfully | JSON object of the saved user (without the password hash exposed) |
| `500 Error` | Server error or database failure | JSON error object |

**Example Response:**

 json  
`{`  
  `"_id": "user_id",`  
  `"username": "exampleUser",`  
  `"email": "user@example.com",`  
  `"password": "hashed_password",`  
  `"createdAt": "timestamp",`  
  `"updatedAt": "timestamp",`  
  `"__v": 0`  
`}`  


### **2\. User Login**

* **Endpoint:** `POST /login`

* **Description:** Authenticates a user and returns their user information (excluding the password). Sets an HTTP-only cookie containing a JWT token.

**Request Body:**  
 json  
`{`  
  `"email": "string (required)",`  
  `"password": "string (required)"`  
`}`  
**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | Login successful. Token is set in a cookie. | JSON user info excluding password |
| `404 Not Found` | User not found | `"User not found!"` |
| `401 Unauthorized` | Invalid password/credentials | `"Wrong credentials!"` |
| `500 Error` | Server error or database failure | JSON error object |

**Example Response:**

 Json  
`{`  
  `"_id": "user_id",`  
  `"username": "exampleUser",`  
  `"email": "user@example.com",`  
  `"createdAt": "timestamp",`  
  `"updatedAt": "timestamp"`  
`}`

**Cookies Set:**

* `token` (HTTP-only, JWT)  
  * Expires in 3 days

---

### **3\. User Logout**

* **Endpoint:** `GET /logout`

* **Description:** Logs the user out by clearing the JWT token cookie.

* **Authentication:** JWT cookie required

**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User logged out successfully | `"User logged out successfully!"` |
| `500 Error` | Server error | JSON error object |

---

### **4\. Refetch Current User**

* **Endpoint:** `GET /refetch`

* **Description:** Verifies and decodes the JWT token from cookies, and returns the user data embedded in the token.

* **Authentication:** JWT cookie required

**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User data retrieved successfully | Decoded JWT payload |
| `404 Not Found` | Invalid/missing token | JWT verification error |
| `500 Error` | Server error | JSON error object |

* 

**Example Response:**

 json  
`{`  
  `"_id": "user_id",`  
  `"username": "exampleUser",`  
  `"email": "user@example.com",`  
  `"iat": 1700000000,`  
  `"exp": 1700600000`

`}`

# **`Comments API Documentation`**

**`Base URL:`** `/api/comments`

---

## **`Endpoints`**

---

### **`1. Create a Comment`**

* **`Endpoint:`** `POST /create`

* **`Description:`** `Creates a new comment on a post. Requires authentication.`

* **`Authentication:`** `Bearer Token (JWT via verifyToken middleware)`

**`Request Body:`**

 `json`  
`{`

  `"postId": "string (required)",`

  `"userId": "string (required)",`

  `"username": "string (optional)",`

  `"text": "string (required)"`

`}`

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Comment created successfully` | `JSON object of the saved comment` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

**`Example Success Response:`**  
 `json`  
`{`

  `"_id": "comment_id",`

  `"postId": "post_id",`

  `"userId": "user_id",`

  `"username": "exampleUser",`

  `"text": "This is a comment",`

  `"createdAt": "timestamp",`

  `"updatedAt": "timestamp",`

  `"__v": 0`

`}`

### **`2. Update a Comment`**

* **`Endpoint:`** `PUT /:id`  
* **`Description:`** `Updates an existing comment by its ID. Requires authentication.`  
* **`Authentication:`** `Bearer Token (JWT via verifyToken middleware)`

**`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | :---- |
| `id` | `String` | `Comment's unique ID` |

**`Request Body:`** `(Any fields to update)`  
 `json`  
`{`

  `"text": "updated comment text"`

`}`

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Comment updated successfully` | `JSON object of the updated comment` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

**`Example Success Response:`**  
 `json`  
`{`

  `"_id": "comment_id",`

  `"postId": "post_id",`

  `"userId": "user_id",`

  `"username": "exampleUser",`

  `"text": "updated comment text",`

  `"createdAt": "timestamp",`

  `"updatedAt": "timestamp",`

  `"__v": 0`

`}`

### **`3. Delete a Comment`**

* **`Endpoint:`** `DELETE /:id`

* **`Description:`** `Deletes a comment by its ID. Requires authentication.`

* **`Authentication:`** `Bearer Token (JWT via verifyToken middleware)`

**`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | ----- |
| `id` | `String` | `Comment's unique ID` |

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Comment deleted successfully` | `"Comment has been deleted!"` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

### **`4. Get Comments for a Post`**

* **`Endpoint:`** `GET /post/:postId`

* **`Description:`** `Retrieves all comments associated with a specific post.`

* **`Authentication:`** `Not required (public access)`

**`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | ----- |
| `postId` | `String` | `The ID of the post` |

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Comments retrieved successfully` | `Array of comment objects` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

**`Example Success Response:`**  
 `json`  
`[`

  `{`

    `"_id": "comment_id1",`

    `"postId": "post_id",`

    `"userId": "user_id1",`

    `"username": "user1",`

    `"text": "First comment",`

    `"createdAt": "timestamp",`

    `"updatedAt": "timestamp"`

  `},`


`{`

    `"_id": "comment_id2",`

    `"postId": "post_id",`

    `"userId": "user_id2",`

    `"username": "user2",`

    `"text": "Second comment",`

    `"createdAt": "timestamp",`

    `"updatedAt": "timestamp"`

  `}`

`]`

---

## **`Authentication & Security Notes`**

* `Routes POST /create, PUT /:id, and DELETE /:id are protected and require a valid JWT token (checked by the verifyToken middleware).`

`Tokens should be passed in the Authorization Header as:`  
 `makefile`  
`CopyEdit`  
`Authorization: Bearer <token>`

# **`📄 Posts API Documentation`**

**`Base URL:`** `/api/posts`

---

## **`Endpoints`**

---

### **`1. Create a Post`**

* **`Endpoint:`** `POST /create`

* **`Description:`** `Creates a new post. Requires authentication.`

* **`Authentication:`** `Bearer Token (verifyToken middleware)`

**`Request Body:`**  
 `json`  
`{`

  `"title": "string (required)",`

  `"desc": "string (optional)",`

  `"photo": "string (optional)",`

  `"userId": "string (required)"`

`}`

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Post created successfully` | `JSON object of the new post` |
| `500 Error` | `Server error / validation fail` | `JSON error object` |

`✅ Example Success Response:`  
 `json`  
`{`

  `"_id": "post_id",`

  `"title": "Post Title",`

  `"desc": "Post Description",`

  `"photo": "image_url",`

  `"userId": "user_id",`

  `"createdAt": "timestamp",`

  `"updatedAt": "timestamp"`

`}`

### **`2. Update a Post`**

* **`Endpoint:`** `PUT /:id`

* **`Description:`** `Updates an existing post by its ID. Requires authentication.`

* **`Authentication:`** `Bearer Token (verifyToken middleware)`

**`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | ----- |
| `id` | `String` | `Post's unique ID` |

**`Request Body:`**  
`json`  
`{`

  `"title": "Updated Title",`

  `"desc": "Updated Description"`

`}`

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Post updated successfully` | `JSON object of the updated post` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

---

### **`3. Delete a Post`**

* **`Endpoint:`** `DELETE /:id`

* **`Description:`** `Deletes a post by its ID. Also deletes all comments associated with the post. Requires authentication.`

* **`Authentication:`** `Bearer Token (verifyToken middleware)`

* **`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | ----- |
| `id` | `String` | `Post's unique ID` |

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Post and comments deleted` | `"Post has been deleted!"` |
| `500 Error` | `Server error or database fail` | `JSON error object` |

---

### **`4. Get Post Details`**

* **`Endpoint:`** `GET /:id`

* **`Description:`** `Retrieves the details of a specific post.`

* **`Path Parameters:`**

| `Parameter` | `Type` | `Description` |
| ----- | ----- | ----- |
| `id` | `String` | `Post's unique ID` |

**`Responses:`**

| `Status Code` | `Description` | `Response Body` |
| ----- | ----- | ----- |
| `200 OK` | `Post retrieved successfully` | `JSON object of the post` |
| `500 Error` | `Server error or database failure` | `JSON error object` |

# **📄 Users API Documentation**

**Base URL:** `/api/users`

---

## **Endpoints**

---

### **1\. Update a User**

* **Endpoint:** `PUT /:id`

* **Description:** Updates an existing user by their ID. If the password is updated, it is hashed before saving.

* **Authentication:** Bearer Token (`verifyToken` middleware)

* **Path Parameters:**

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `id` | String | User's unique ID |

**Request Body (JSON):**

 json  
`{`  
  `"username": "string (optional)",`  
  `"email": "string (optional)",`  
  `"password": "string (optional)", // Will be hashed automatically`  
  `"profilePic": "string (optional)",`  
  `"otherFields": "..."`  
`}`

✅ **Password Handling:**

* If you pass a `password`, it will be automatically hashed with bcrypt before being stored.

**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User updated successfully | Updated user object (without password) |
| `500 Error` | Server error or database failure | JSON error object |

---

### **2\. Delete a User**

* **Endpoint:** `DELETE /:id`

* **Description:** Deletes a user by their ID. Also deletes all posts and comments associated with the user.

* **Authentication:** Bearer Token (`verifyToken` middleware)

* **Path Parameters:**

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `id` | String | User's unique ID |

**What happens on delete?**

* Deletes:  
  * The user account.  
    * All posts by that user.  
    * All comments by that user.  
* **Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User and related data deleted | `"User has been deleted!"` |
| `500 Error` | Server error | JSON error object |

---

### **3\. Get User Details**

* **Endpoint:** `GET /:id`

* **Description:** Retrieves details of a specific user by ID, excluding their password.

* **Path Parameters:**

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `id` | String | User's unique ID |

**Responses:**

| Status Code | Description | Response Body |
| ----- | ----- | ----- |
| `200 OK` | User details retrieved | User object (without password) |
| `500 Error` | Server error or not found | JSON error object |

✅ **Example Response:**

 json  
`{`  
  `"_id": "user_id",`  
  `"username": "johndoe",`  
  `"email": "johndoe@example.com",`  
  `"profilePic": "profile.jpg",`  
  `"createdAt": "timestamp",`  
  `"updatedAt": "timestamp"`  
`}`  


## **🛡️ Authentication & Security Notes**

**Protected routes** (PUT and DELETE) require **JWT authentication**:  
 makefile  
`Authorization: Bearer <your_token_here>`
