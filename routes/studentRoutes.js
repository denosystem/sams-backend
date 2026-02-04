const express = require("express");
const router = express.Router();

const schoolAuth = require("../middleware/schoolAuth");
const { getStudents, addStudent } = require("../controllers/studentController");

// protect ALL student routes
router.use(schoolAuth);

router.get("/", getStudents);
router.post("/", addStudent);

module.exports = router;
