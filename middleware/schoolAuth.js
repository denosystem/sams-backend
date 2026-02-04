const path = require("path");
const crypto = require("crypto");
const { readJSON } = require("../utils/jsonDb");

const schoolsFile = path.join(__dirname, "../data/schools.json");

function hashKey(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

module.exports = function schoolAuth(req, res, next) {
  const key = req.headers["x-school-key"];
  if (!key) return res.status(401).json({ message: "Missing x-school-key header" });

  const schools = readJSON(schoolsFile, []);
  const keyHash = hashKey(key);

  const school = schools.find((s) => s.keyHash === keyHash);

  if (!school) return res.status(401).json({ message: "Invalid school key" });
  if (school.active === false) return res.status(403).json({ message: "School is disabled" });

  req.school = {
    id: school.id,
    name: school.name,
    email: school.email,
    active: school.active
  };

  next();
};
