//app.js
const express = require("express");
const mongoose = require("mongoose");
const scheduleRouter = require("./Routes/ScheduleRoutes");
const taskRouter = require("./Routes/TaskRoutes");
const cors = require("cors");

const app = express();

// Clear model cache
delete mongoose.connection.models['Task'];

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Improved JSON parsing middleware
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  },
  strict: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use("/ProjectSchedules", scheduleRouter);
app.use("/Tasks", taskRouter);

// Database connection
mongoose.connect("mongodb+srv://ProjectManager:Vi1SbONH47P0slOG@cluster0.glzpz.mongodb.net/ProjectManagementDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  
  // Verify indexes
  mongoose.connection.db.collection('tasks').indexes()
    .then(indexes => console.log("Current indexes:", indexes))
    .catch(err => console.error("Error checking indexes:", err));

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      success: false,
      error: "Invalid or missing authentication token" 
    });
  }

  res.status(500).json({ 
    success: false,
    error: err.message || "Internal server error" 
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});