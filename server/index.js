// Entry point for the server.
// - Sets up the Express app.
// - Connects to MongoDB using the MONGO_URI from the .env file.
// - Defines API routes for trends.

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import trendsRoute from "./routes/trends.js";

dotenv.config({ path: '.env' }); // Load environment variables from .env file.

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

// Middleware to parse JSON requests.
app.use(express.json());
// Define routes for the API.
app.use("/api/trends", trendsRoute);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI is not set in .env");
  process.exit(1);
}
// Connect to MongoDB.
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✓ MongoDB connected");

// Start the server.
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("✗ MongoDB connection failed:", err.message);
    process.exit(1);
  });
