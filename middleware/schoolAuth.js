const path = require("path");
const { readJSON } = require("../utils/jsonDb");

const licensesFile = path.join(__dirname, "../data/licenses.json");

function schoolAuth(req, res, next) {
  const key = req.header("x-school-key");
  if (!key) {
    return res.status(401).json({ message: "Missing x-school-key header" });
  }

  const licenses = readJSON(licensesFile, []);
  const license = licenses.find((l) => l.key === key);

  if (!license) {
    return res.status(403).json({ message: "Invalid school key" });
  }
  if (license.status !== "active") {
    return res.status(403).json({ message: `School key is ${license.status}` });
  }

  // attach school context
  req.school = {
    schoolId: license.schoolId,
    name: license.schoolName,
  };

  next();
}

module.exports = { schoolAuth };
