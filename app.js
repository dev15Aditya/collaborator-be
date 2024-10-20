const express = require('express');
const cors = require('cors');
const roomController = require('./controllers/roomController');

const app = express();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://collaborator-gold.vercel.app"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/create-room', roomController);

module.exports = app;
