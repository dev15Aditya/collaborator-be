# Real-Time Chat Application with Public and Private Rooms

This is a ongoing project. currently it is completed for real-time chat application. It's built with **Node.js**, **Express**, **MongoDB**, and **Socket.io**. The application allows users to join public chat rooms, initiate private 1:1 chats, and exchange messages with real-time updates.

## Features

- **User Authentication**: Signup and login for users to access the chat system.
- **Public Chat Rooms**: Users can join any public room and chat with other users.
- **Private 1:1 Chats**: Users can initiate and participate in private chats with specific users.
- **Real-Time Messaging**: Using Socket.io, messages are delivered instantly across all connected clients.
- **Database Storage**: Messages and user data are stored in MongoDB for persistence.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** instance running locally or remotely
- **Postman** (optional, for testing API endpoints)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dev15Aditya/collaborator-be.git
   cd collaborator-be

2. Install node modules
    ```bash
    npm install

3. Create a .env file in root directory
    ```bash
    JWT_SECRET
    origin_uri (this is for cors)
    mongo_uri

4. In the terminal start project
    ```bash
    nodemon

## Project Structure

- src/
  - config/
    - db.js               // Database connection setup
    - socket.js           // Socket.io configuration and events
  - controllers/
    - roomController.js   // Room-related endpoints
    - userController.js   // User-related endpoints
    - messageController.js // Message-related endpoints
  - models/
    - Room.js             // Room schema
    - User.js             // User schema
    - Message.js          // Message schema
    - Whiteboard.js       // Whiteboard schema
  - routes/
    - roomRoutes.js       // Routes for room-related endpoints
    - userRoutes.js       // Routes for user-related endpoints
    - messageRoutes.js    // Routes for message-related endpoints
  - services/
    - roomService.js      // Business logic for rooms
    - userService.js      // Business logic for users
    - messageService.js   // Business logic for messages
  - utils/
    - auth.js             // Authentication middleware and helpers
    - constants.js        // App-wide constants
    - socketEvents.js     // Socket event names and constants
  - app.js                // Express app setup and Socket.io server
