const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendanceBySession
} = require("../controllers/attendanceController");

router.post("/", markAttendance);
router.get("/session/:sessionId", getAttendanceBySession);

module.exports = router;
