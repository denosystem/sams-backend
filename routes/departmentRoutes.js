const express = require("express");
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
const requireRole = require("../middleware/requireRole");
const { createDepartment, assignHod, listDepartments } = require("../controllers/departmentController");

router.get("/", requireAuth, requireRole("ADMIN", "HOD"), listDepartments);
router.post("/", requireAuth, requireRole("ADMIN"), createDepartment);
router.post("/:departmentId/assign-hod", requireAuth, requireRole("ADMIN"), assignHod);

module.exports = router;
