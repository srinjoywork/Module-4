# TechBlog - A MERN Stack Blogging Platform

TechBlog is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). This platform allows users to register, log in, create, publish, and manage their blogs. Other users can read these blogs and post comments, fostering interaction within the community.

## Features

- **User Authentication:** 
  - Users can sign up, log in, and log out securely.
  - Passwords are hashed for security, and JWT-based authentication is implemented.
  
- **Blog Management:**
  - Registered users can create, edit, and delete their blog posts.
  - Blogs can be published and are accessible to all users.
  
- **Comment System:**
  - Users can comment on blog posts.
  - Comments are displayed in real-time, encouraging active discussions.

- **Responsive Design:**
  - The application is fully responsive, providing an optimal user experience on both desktop and mobile devices.

## Technologies Used

- **Frontend:**
  - React.js with Hooks and Context API
  - Tailwind CSS for responsive design and styling

- **Backend:**
  - Node.js and Express.js for building the server-side API
  - MongoDB with Mongoose for the database
  - JWT (JSON Web Tokens) for secure authentication

- **Other Tools:**
  - Axios for making HTTP requests from the frontend to the backend
  - bcrypt.js for password hashing
  - dotenv for environment variable management

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- Node.js and npm (Node Package Manager)
- MongoDB (running locally or via a cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/techblog.git
   cd techblog
