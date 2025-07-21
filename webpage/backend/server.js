const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS configuration
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan("combined"));

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/java-documentation",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/api/team-members", require("./routes/teamMembers"));
app.use("/api/assignments", require("./routes/assignments"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/activity", require("./routes/activity"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: error.message,
      details: error.errors,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
      message: "The provided ID is not valid",
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : error.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
