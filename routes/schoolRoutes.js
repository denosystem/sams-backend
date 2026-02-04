const express = require("express");
const router = express.Router();

const { createSchool, getMySchool } = require("../controllers/schoolController");

router.post("/", createSchool);
router.get("/me", getMySchool);

module.exports = router;
