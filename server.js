require("dotenv").config();
const express = require("express");

const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const schoolRoutes = require("./routes/schoolRoutes");

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "SAMS Backend is running ✅" });
});

// Developer + School endpoints
app.use("/api", schoolRoutes);

// School-scoped modules
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
