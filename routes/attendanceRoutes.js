const express = require("express");
const router = express.Router();

const {
  checkIn,
  getSessionAttendance,
  getStudentAttendance
} = require("../controllers/attendanceController");

router.post("/checkin", checkIn);
router.get("/session/:sessionId", getSessionAttendance);
router.get("/student/:studentId", getStudentAttendance);

module.exports = router;
