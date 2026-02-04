require("dotenv").config();

const express = require("express");
const cors = require("cors");

/* ROUTES */
const schoolRoutes = require("./routes/schoolRoutes");
const studentRoutes = require("./routes/studentRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// OPTIONAL: only if you already created teacherRoutes.js
// const teacherRoutes = require("./routes/teacherRoutes");

const schoolAuth = require("./middlewares/schoolAuth");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.json({
    name: "SAMS",
    message: "Smart Attendance Management System API is running 🚀",
    multiSchool: true,
  });
});

/* HEALTH */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

/* ADMIN/SCHOOL KEY API */
app.use("/schools", schoolRoutes);

/* SCHOOL-PROTECTED MODULES (require x-school-key header) */
app.use("/students", schoolAuth, studentRoutes);
// app.use("/teachers", schoolAuth, teacherRoutes); // enable only if you have it
app.use("/sessions", schoolAuth, sessionRoutes);
app.use("/attendance", schoolAuth, attendanceRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

/* ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message || "Unknown error",
  });
});

/* START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 SAMS server running on http://localhost:${PORT}`));
