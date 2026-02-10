const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");

const { createSession, getSessionQrPng, endSession, checkIn, listSessionAttendance } =
  require("../controllers/sessionController");

router.post("/", requireAuth, requireRole("TEACHER"), createSession);
router.get("/:sessionId/qr.png", requireAuth, requireRole("TEACHER", "ADMIN", "HOD"), getSessionQrPng);

router.post("/:sessionId/end", requireAuth, requireRole("TEACHER"), endSession);

router.post("/checkin", requireAuth, requireRole("STUDENT"), checkIn);

router.get("/:sessionId/attendance", requireAuth, requireRole("TEACHER", "ADMIN", "HOD"), listSessionAttendance);

module.exports = router;
