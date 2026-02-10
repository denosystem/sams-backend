const router = require("express").Router();

const { sendNotification, listNotifications } = require("../controllers/notificationController");
const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");

// Anyone logged in can read notifications (change if you want)
router.get("/", requireAuth, listNotifications);

// Only ADMIN/HOD/TEACHER/SUPER_ADMIN can send
router.post(
  "/send",
  requireAuth,
  requireRole(["ADMIN", "HOD", "TEACHER", "SUPER_ADMIN"]),
  sendNotification
);

module.exports = router;
