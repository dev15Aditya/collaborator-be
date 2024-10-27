const corsConfig = {
    origin: "https://collabx-red.vercel.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  };
  
  module.exports = corsConfig;
  