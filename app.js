const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const sessionRouter = require("./routes/sessionsRoutes");
const onboardingRouter = require("./routes/onboardingRoutes");
const meditationsRouter = require("./routes/meditationRoutes");
const meditationsSessionsRouter = require("./routes/meditationsSessionRoutes");

const Category = require("./models/category").Category;
const { categoriesData } = require("./data/categoryData");
const Grid = require("gridfs-stream");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

// Wait for the MongoDB connection to be established
conn.once("open", () => {
  console.log("Connected to MongoDB");

  // Create a GridFS stream for storing and retrieving files
  Grid.mongo = mongoose.mongo;
  const gfs = Grid(conn.db);

  // Set up your routes after the MongoDB connection is ready
  app.use("/api/auth", authRoutes);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/sessions", sessionRouter);
  app.use("/api/onboarding", onboardingRouter);
  app.use("/api/meditations", meditationsRouter);
  app.use("/api/meditation-sessions", meditationsSessionsRouter);

  // Include the MP3 file upload route

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });

  app.listen(8080, () => {
    console.log("Server started on port 8080");
  });
});

// Handle MongoDB connection errors
conn.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  // You can add error handling logic here if needed
});
