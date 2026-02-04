const path = require("path");
const crypto = require("crypto");
const { readJson, writeJson } = require("../utils/jsonDb");

const SCHOOLS_FILE = path.join(__dirname, "..", "data", "schools.json");

function makeSchoolKey() {
  return "SCH-" + crypto.randomBytes(16).toString("hex");
}

// POST /schools
// Header: x-admin-key: MASTER_ADMIN_KEY
// body: { name }
const createSchool = (req, res) => {
  const adminKey = req.header("x-admin-key");
  if (!adminKey || adminKey !== process.env.MASTER_ADMIN_KEY) {
    return res.status(403).json({ message: "Forbidden (invalid admin key)" });
  }

  const { name } = req.body || {};
  if (!name) return res.status(400).json({ message: "name is required" });

  const schools = readJson(SCHOOLS_FILE, []);
  const id = "school_" + crypto.randomBytes(6).toString("hex");
  const key = makeSchoolKey();

  const school = { id, name, key, createdAt: new Date().toISOString() };

  schools.push(school);
  writeJson(SCHOOLS_FILE, schools);

  return res.status(201).json({
    message: "School created",
    school: { id: school.id, name: school.name },
    schoolKey: school.key,
  });
};

// GET /schools/me
// Header: x-school-key
const getMySchool = (req, res) => {
  const key = req.header("x-school-key");
  if (!key) return res.status(401).json({ message: "Missing x-school-key" });

  const schools = readJson(SCHOOLS_FILE, []);
  const school = schools.find((s) => s.key === key);
  if (!school) return res.status(403).json({ message: "Invalid school key" });

  return res.json({
    id: school.id,
    name: school.name,
    createdAt: school.createdAt,
  });
};

module.exports = { createSchool, getMySchool };
