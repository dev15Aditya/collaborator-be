const express = require('express');
const cors = require('cors');
const corsConfig = require('./utils/corsConfig');
const router = require('./routes/roomRoutes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors(corsConfig));
app.use(express.json());
app.use('/api/rooms', router);



module.exports = app;
