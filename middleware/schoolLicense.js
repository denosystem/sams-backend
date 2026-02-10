// backend/middleware/schoolLicense.js
const School = require("../models/School");

module.exports = async function schoolLicense(req, res, next) {
  try {
    const key = req.header("x-school-key");
    if (!key) {
      return res.status(401).json({ ok: false, message: "Missing school license key" });
    }

    const school = await School.findOne({ licenseKey: key });
    if (!school) {
      return res.status(403).json({ ok: false, message: "Invalid school license key" });
    }

    if (school.isActive === false) {
      return res.status(403).json({ ok: false, message: "School license is disabled" });
    }

    if (school.expiresAt && new Date(school.expiresAt).getTime() < Date.now()) {
      return res.status(403).json({ ok: false, message: "School license expired" });
    }

    req.school = school;
    next();
  } catch (err) {
    console.error("schoolLicense error:", err);
    return res.status(500).json({ ok: false, message: "Server error" });
  }
};
