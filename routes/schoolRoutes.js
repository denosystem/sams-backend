const express = require("express");
const router = express.Router();

const devAuth = require("../middleware/devAuth");
const schoolAuth = require("../middleware/schoolAuth");

const {
  createSchool,
  listSchools,
  setSchoolActive,
  rotateSchoolKey,
  getMySchool
} = require("../controllers/schoolController");

// Developer routes
router.post("/dev/schools", devAuth, createSchool);
router.get("/dev/schools", devAuth, listSchools);
router.patch("/dev/schools/:schoolId/active", devAuth, setSchoolActive);
router.post("/dev/schools/:schoolId/rotate-key", devAuth, rotateSchoolKey);

// School route (verify the key)
router.get("/school/me", schoolAuth, getMySchool);

module.exports = router;
