import mongoose from "mongoose";
const express = require("express");
import dotenv from "dotenv";
import cors from "cors";  

const MONGODB_URI = process.env.MONGODB_URI as string;

dotenv.config();
const app = express();
const port = process.env.HOST_ENV ?? "";
const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    if (!MONGODB_URI) {
    throw new Error("❌ MONGO_URI is not defined in environment variables.");
      }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    throw new Error("MongoDB connection failed");
  }
  // await mongoose.connect(MONGODB_URI, {
  //   dbName: "your_database_name",
  // });
};


// CORS middleware configuration
const corsOptions = {
  origin: port, // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE,HEAD,PATCH", // Allowable methods
};

app.use(cors(corsOptions));

export default dbConnect;
