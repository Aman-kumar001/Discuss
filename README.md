# Discuss Web Application

Discuss is a web application that allows users to engage in discussions by posting, commenting on posts, and replying to comments. The application presents comments in a hierarchical tree structure, showcasing the relationship between parent and child comments.

## Features

- **User Registration:** Users must register with a unique name and password before they can participate in discussions.
- **Post Creation:** Users can create new posts to initiate discussions.
- **Commenting:** Users can comment on posts to share their thoughts and opinions.
- **Comment Hierarchy:** Comments are organized in a tree structure, displaying the relationship between parent and child comments.
- **Comment Replies:** Users can reply to existing comments, creating a threaded conversation.
- **User Authentication:** User credentials are securely stored and authenticated to ensure secure access to the application.
- **User Profiles:** Users have their own profiles where they can view and manage their posts and comments.

## Installation

To run the Discuss web application locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/discuss-webapp.git
2. Navigate to the project directory:
  
   ```shell
   cd discuss
3. Install the required dependencies:

   ```shell
   npm install
4. Set up the MongoDB database:

   -Install MongoDB on your local machine or use a remote MongoDB service.
   -Create a new MongoDB database.
   -Update the MongoDB connection URL in the config.js file to point to your MongoDB database.

5. Start the backend server:

   ```shell
   npm run start

6. Start the frontend development server:

 


# Technologies Used

Discuss web application is built using the following technologies:

    Front-end: React.js, Material-UI
    Back-end: Node.js, Express.js
    Database: MongoDB
    Authentication: JSON Web Tokens (JWT)

Usage

    Register a new user:
        On the Discuss web application homepage, click on the "New ?" button.
        Provide a unique username and password.
        Click on "Register" to create a new user account.

    Log in:
        After registering, you can log in using your credentials.
        On the Discuss web application homepage, click on the "Log In" button.
        Enter your username and password.
        Click on "Log in" to log in.

    Create a new post:
        Once logged in, you can create a new post by clicking on the "Create Post" button.
        Provide a title and content for your post.
        Click on "Post" to create the post.

    Comment on a post:
        To comment on a post, navigate to the desired post.
        Scroll to the bottom of the post and enter your comment in the provided input field.
        Click on "Post" to add your comment.

    Reply to a comment:
        To reply to a comment, locate the desired comment.
        Click on the "post" button next to the comment.
        Enter your reply in the provided input field.
        Click on "post" to add your reply.

    View comment hierarchy:
        All comments are displayed in a hierarchical tree structure, showcasing the parent-child relationships.
        Parent comments are shown at the top, followed by their child comments.


# License
The Discuss web application is open-source and distributed under the MIT License. Feel free to modify and use the code according to the terms of the license.

