const path = require("path");
const { readJson } = require("../utils/jsonDb");

const SCHOOLS_FILE = path.join(__dirname, "..", "data", "schools.json");

function schoolAuth(req, res, next) {
  const key = req.header("x-school-key");

  if (!key) {
    return res.status(401).json({ message: "Missing x-school-key header" });
  }

  const schools = readJson(SCHOOLS_FILE, []);
  const school = schools.find((s) => s.key === key);

  if (!school) {
    return res.status(403).json({ message: "Invalid school key" });
  }

  req.school = { schoolId: school.id, schoolName: school.name };
  next();
}

module.exports = schoolAuth;
