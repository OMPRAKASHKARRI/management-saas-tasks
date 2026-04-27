const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ ALWAYS first
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("API Running 🚀");
});

module.exports = app;