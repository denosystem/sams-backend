const path = require("path");
const crypto = require("crypto");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const attendanceFile = path.join(__dirname, "../data/attendance.json");

const markAttendance = (req, res) => {
  const attendance = readJSON(attendanceFile, []);

  const {
    schoolKey,
    sessionId,
    studentId,
    method // qr | biometric | face
  } = req.body;

  if (!schoolKey || !sessionId || !studentId || !method) {
    return res.status(400).json({
      error: "schoolKey, sessionId, studentId, and method are required"
    });
  }

  const record = {
    id: crypto.randomUUID(),
    schoolKey,
    sessionId,
    studentId,
    method,
    timestamp: new Date().toISOString()
  };

  attendance.push(record);
  writeJSON(attendanceFile, attendance);

  res.status(201).json({
    message: "Attendance recorded successfully",
    attendance: record
  });
};

const getAttendanceBySession = (req, res) => {
  const { sessionId } = req.params;
  const attendance = readJSON(attendanceFile, []);

  const results = attendance.filter(a => a.sessionId === sessionId);

  res.json(results);
};

module.exports = {
  markAttendance,
  getAttendanceBySession
};
