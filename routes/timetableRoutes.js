// backend/routes/timetableRoutes.js
const router = require("express").Router();

const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");

const {
  upsertTimetable,
  getTeacherTimetable,
  getStudentTimetable,
} = require("../controllers/timetableController");

// Admin can create/update timetable
router.post(
  "/",
  requireAuth,
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  upsertTimetable
);

// Teacher timetable
router.get(
  "/teacher/:teacherId",
  requireAuth,
  requireRole(["TEACHER", "HOD", "ADMIN", "SUPER_ADMIN"]),
  getTeacherTimetable
);

// Student timetable
router.get(
  "/student/:studentId",
  requireAuth,
  requireRole(["STUDENT", "TEACHER", "HOD", "ADMIN", "SUPER_ADMIN"]),
  getStudentTimetable
);

module.exports = router;
