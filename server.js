const http = require('http');
const app = require('./app');
const connectDB = require('./db/mongoConnection');


connectDB();
// Create HTTP server
const server = http.createServer(app);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
