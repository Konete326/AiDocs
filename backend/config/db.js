const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async (retries = 3, delay = 3000) => {
  if (isConnected) {
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 8000,
        connectTimeoutMS: 10000,
      });

      isConnected = conn.connections[0].readyState;
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      const isNetworkError = error.message.includes('ECONNREFUSED') || error.message.includes('querySrv');
      const hint = isNetworkError
        ? '→ Likely cause: IP not whitelisted on MongoDB Atlas. Go to Atlas > Network Access > Add 0.0.0.0/0 for local dev.'
        : '';

      if (attempt < retries) {
        console.warn(`⚠️  MongoDB attempt ${attempt}/${retries} failed: ${error.message} ${hint}`);
        console.warn(`   Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(`❌ MongoDB connection failed after ${retries} attempts: ${error.message} ${hint}`);
        throw error;
      }
    }
  }
};

module.exports = connectDB;
