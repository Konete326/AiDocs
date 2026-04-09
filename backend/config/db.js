const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aidocs');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn; 
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not exit process in serverless environment
    throw error;
  }
};

module.exports = connectDB;
