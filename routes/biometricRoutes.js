const express = require("express");
const router = express.Router();

const {
  registerBiometric,
  verifyBiometric
} = require("../controllers/biometricController");

// ALWAYS confirm these are functions
router.post("/register", registerBiometric);
router.post("/verify", verifyBiometric);

module.exports = router;
