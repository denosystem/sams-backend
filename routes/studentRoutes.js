const express = require("express");
const router = express.Router();

const developerAuth = require("../middleware/developerAuth");

// ✅ IMPORTANT: DO NOT CALL IT like developerAuth()
router.use(developerAuth);

// test route (so we confirm it works)
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "students route working + developer key verified" });
});

module.exports = router;
