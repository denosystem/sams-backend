const router = require("express").Router();
const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");
const User = require("../models/User");

/**
 * GET /users/me
 * Returns the logged-in user info
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ ok: true, user });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

/**
 * GET /users
 * Admins can list users (basic)
 */
router.get(
  "/",
  requireAuth,
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  async (req, res) => {
    try {
      const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
      res.json({ ok: true, users });
    } catch (e) {
      res.status(500).json({ ok: false, error: e.message });
    }
  }
);

/**
 * PATCH /users/:id/role
 * Admin assigns role (ADMIN/HOD/TEACHER/STUDENT)
 */
router.patch(
  "/:id/role",
  requireAuth,
  requireRole(["ADMIN", "SUPER_ADMIN"]),
  async (req, res) => {
    try {
      const { role, departmentId } = req.body;

      const allowed = ["SUPER_ADMIN", "ADMIN", "HOD", "TEACHER", "STUDENT"];
      if (!allowed.includes(role)) {
        return res.status(400).json({ ok: false, message: "Invalid role" });
      }

      const update = { role };

      // Optional: if assigning HOD/TEACHER, save departmentId
      if (departmentId) update.departmentId = departmentId;

      const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-passwordHash");
      if (!user) return res.status(404).json({ ok: false, message: "User not found" });

      res.json({ ok: true, user });
    } catch (e) {
      res.status(500).json({ ok: false, error: e.message });
    }
  }
);

module.exports = router;
