const express = require("express");
const router = express.Router();

// ✅ CORRECT PATH
const {
  startSession,
  endSession,
  getSession
} = require("../controllers/sessionController");

// Start a new session
router.post("/start", startSession);

// End an existing session
router.post("/end/:sessionId", endSession);

// Get session details
router.get("/:sessionId", getSession);

module.exports = router;
