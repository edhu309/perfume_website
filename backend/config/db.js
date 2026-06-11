const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If local MongoDB is not available, use in-memory server
    if (!uri || uri.includes("localhost") || uri.includes("127.0.0.1")) {
      try {
        await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        return;
      } catch {
        console.log("Local MongoDB not found. Starting in-memory MongoDB...");
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
      }
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
