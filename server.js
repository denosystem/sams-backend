const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.json({
    name: "SAMS",
    message: "API is running 🚀"
  });
});

/* STUDENTS ROUTE */
app.use("/students", studentRoutes);

/* HEALTH */
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 SAMS server running on http://localhost:${PORT}`);
});
