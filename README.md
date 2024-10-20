# Collaborative Whiteboard API

This is a simple collaborative whiteboard server using **Express**, **Socket.io**, and **CORS**. It supports real-time communication between multiple clients for drawing on a shared whiteboard.

## Features

- Create a unique room for each whiteboard session.
- Clients can join specific rooms and see real-time updates.
- Actions (draw, undo, redo) are broadcast to all connected clients in the room.
- In-memory storage for whiteboard states.

## Tech Stack

- **Node.js**
- **Express.js**
- **Socket.io**
- **CORS**

## Setup

To run this server locally, follow these steps:

### 1. Clone the repository:
`
git clone <your-repo-url>
cd <your-project-directory> 
`

### 2. Install dependencies:
`
npm install
`

### 3. Start the server:
`
node server.js
`

