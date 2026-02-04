const path = require("path");
const crypto = require("crypto");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const schoolsFile = path.join(__dirname, "../data/schools.json");

function genId(prefix = "sch") {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

function generateKey() {
  // looks nice to email and hard to guess
  return `SAMS_${crypto.randomBytes(24).toString("hex")}`;
}

function hashKey(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

// DEV: create a school + return key ONCE
const createSchool = (req, res) => {
  const { name, email, phone } = req.body || {};
  if (!name) return res.status(400).json({ message: "name is required" });

  const schools = readJSON(schoolsFile, []);

  const id = genId("school");
  const apiKey = generateKey();
  const keyHash = hashKey(apiKey);

  const school = {
    id,
    name,
    email: email || null,
    phone: phone || null,
    keyHash,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  schools.push(school);
  writeJSON(schoolsFile, schools);

  // IMPORTANT: only return the raw key at creation time
  return res.status(201).json({
    message: "School created. Save the key now (it will not be shown again).",
    school: {
      id: school.id,
      name: school.name,
      email: school.email,
      phone: school.phone,
      active: school.active,
      createdAt: school.createdAt
    },
    schoolKey: apiKey
  });
};

// DEV: list schools (no key returned)
const listSchools = (req, res) => {
  const schools = readJSON(schoolsFile, []);
  const safe = schools.map((s) => ({
    id: s.id,
    name: s.name,
    email: s.email,
    phone: s.phone,
    active: s.active,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt
  }));
  res.json({ message: "Schools fetched", schools: safe });
};

// DEV: disable or enable school
const setSchoolActive = (req, res) => {
  const { schoolId } = req.params;
  const { active } = req.body || {};

  if (typeof active !== "boolean") {
    return res.status(400).json({ message: "active must be true or false" });
  }

  const schools = readJSON(schoolsFile, []);
  const idx = schools.findIndex((s) => s.id === schoolId);
  if (idx === -1) return res.status(404).json({ message: "School not found" });

  schools[idx].active = active;
  schools[idx].updatedAt = new Date().toISOString();
  writeJSON(schoolsFile, schools);

  res.json({
    message: "School status updated",
    school: { id: schools[idx].id, name: schools[idx].name, active: schools[idx].active }
  });
};

// DEV: rotate key (returns new key ONCE)
const rotateSchoolKey = (req, res) => {
  const { schoolId } = req.params;

  const schools = readJSON(schoolsFile, []);
  const idx = schools.findIndex((s) => s.id === schoolId);
  if (idx === -1) return res.status(404).json({ message: "School not found" });

  const newKey = generateKey();
  schools[idx].keyHash = hashKey(newKey);
  schools[idx].updatedAt = new Date().toISOString();
  writeJSON(schoolsFile, schools);

  res.json({
    message: "Key rotated. Save the new key now (it will not be shown again).",
    school: { id: schools[idx].id, name: schools[idx].name, active: schools[idx].active },
    schoolKey: newKey
  });
};

// SCHOOL (using x-school-key): get "my school"
const getMySchool = (req, res) => {
  res.json({
    message: "School verified",
    school: req.school
  });
};

module.exports = {
  createSchool,
  listSchools,
  setSchoolActive,
  rotateSchoolKey,
  getMySchool
};
