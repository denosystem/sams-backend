const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");
const { exportSessionCsv, exportSessionPdf } = require("../controllers/reportController");

router.get("/sessions/:sessionId.csv", requireAuth, requireRole("TEACHER", "ADMIN", "HOD"), exportSessionCsv);
router.get("/sessions/:sessionId.pdf", requireAuth, requireRole("TEACHER", "ADMIN", "HOD"), exportSessionPdf);

module.exports = router;
