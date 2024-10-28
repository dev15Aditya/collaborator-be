const corsConfig = {
    origin: process.env.origin_uri,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  };
  
module.exports = corsConfig;