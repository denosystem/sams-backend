const express = require("express");
const crypto = require("crypto");
const developerAuth = require("../middleware/developerAuth");

const School = require("../models/School");
const LicenseKey = require("../models/LicenseKey");

const router = express.Router();

// helper: hash keys so you never store raw keys
function hashKey(key) {
  return crypto.createHash("sha256").update(String(key)).digest("hex");
}

// ✅ Create a school (developer only)
router.post("/schools", developerAuth, async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) return res.status(400).json({ ok: false, error: "name + code required" });

    const school = await School.create({ name, code });
    res.json({ ok: true, school });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ✅ Generate a license key for a school (developer only)
router.post("/license/generate", developerAuth, async (req, res) => {
  try {
    const { schoolCode, label } = req.body;
    if (!schoolCode) return res.status(400).json({ ok: false, error: "schoolCode required" });

    const school = await School.findOne({ code: String(schoolCode).toUpperCase().trim() });
    if (!school) return res.status(404).json({ ok: false, error: "School not found" });

    // Create raw key (what you will give to the school)
    const rawKey = crypto.randomBytes(24).toString("hex"); // long key
    const keyHash = hashKey(rawKey);

    await LicenseKey.create({
      school: school._id,
      keyHash,
      label: label || "Main License",
      isActive: true,
    });

    // IMPORTANT: only return raw key once (you copy & give them)
    res.json({
      ok: true,
      school: { id: school._id, name: school.name, code: school.code },
      licenseKey: rawKey,
      note: "Copy this key now. It will not be shown again.",
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ✅ Verify license key (used by school system)
router.post("/license/verify", async (req, res) => {
  try {
    const { schoolCode, licenseKey } = req.body;
    if (!schoolCode || !licenseKey) {
      return res.status(400).json({ ok: false, error: "schoolCode + licenseKey required" });
    }

    const school = await School.findOne({ code: String(schoolCode).toUpperCase().trim() });
    if (!school) return res.status(404).json({ ok: false, error: "School not found" });

    const keyHash = hashKey(licenseKey);

    const found = await LicenseKey.findOne({
      school: school._id,
      keyHash,
      isActive: true,
    });

    if (!found) return res.status(401).json({ ok: false, error: "Invalid or inactive license key" });

    res.json({ ok: true, message: "License key valid", school: { code: school.code, name: school.name } });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
