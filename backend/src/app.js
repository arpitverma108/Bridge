const express = require("express");
const cors = require("cors");

const permissionRoutes = require("./routes/permissionRoutes");
const userRoutes = require("./routes/userRoutes"); // 🔥 ADD THIS
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/permissions", permissionRoutes);
app.use("/api/users", userRoutes); // 🔥 ADD THIS

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Bridge Backend Running");
});

// Error handler
app.use(errorHandler);

module.exports = app;