const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// ---- Rate limiters (SAFE) ----
let rateLimiters = {};
try {
  rateLimiters = require("./middleware/rateLimiters");
} catch (e) {
  console.warn("⚠️ rateLimiters.js not found or has error:", e.message);
}

const {
  devLimiter,
  emailLimiter,
  authLimiter,
  apiLimiter, // <- if you have it, great. if not, we fallback safely below.
} = rateLimiters;

// If a limiter is missing, this avoids the “middleware undefined” crash
const safeMw = (mw) => (typeof mw === "function" ? mw : (req, res, next) => next());

/**
 * Routes
 */
const authRoutes = require("./routes/authRoutes");
const devRoutes = require("./routes/devRoutes");
const studentRoutes = require("./routes/studentRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");

// NEW
const reportRoutes = require("./routes/reportRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const biometricRoutes = require("./routes/biometricRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ---- Mongo connect ----
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI missing in .env");
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}
connectDB().catch((e) => {
  console.error("❌ MongoDB connection error:", e.message);
  process.exit(1);
});

// ---- Base routes ----
app.get("/", (req, res) => {
  res.json({ name: "SAMS", message: "Smart Attendance Management System API running 🚀" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date() });
});

// ✅ Apply a general limiter to ALL /api routes (SAFE even if missing)
app.use("/api", safeMw(apiLimiter || devLimiter));

/**
 * AUTH (rate limited)
 */
app.use("/api/auth", safeMw(authLimiter), authRoutes);

/**
 * DEV (rate limited)
 */
app.use("/api/dev/license/email", safeMw(emailLimiter));
app.use("/api/dev", safeMw(devLimiter), devRoutes);

/**
 * Core system (all under /api)
 */
app.use("/api/students", studentRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);

// NEW (all under /api)
app.use("/api/reports", reportRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/timetable", timetableRoutes);
app.use("/api/biometric", biometricRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 SAMS server running on http://localhost:${PORT}`);
});
