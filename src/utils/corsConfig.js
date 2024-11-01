const corsConfig = {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  };
  
module.exports = corsConfig;