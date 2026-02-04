const fs = require("fs");
const path = require("path");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const raw = fs.readFileSync(filePath, "utf-8");
    if (!raw || raw.trim() === "") return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function genId(prefix = "id") {
  const rand = Math.random().toString(16).slice(2);
  return `${prefix}_${Date.now().toString(16)}_${rand}`;
}

/* MULTI-SCHOOL HELPERS */
function schoolFolder(schoolId) {
  return path.join(__dirname, "..", "data", "schools", schoolId);
}

function schoolFile(schoolId, filename) {
  return path.join(schoolFolder(schoolId), filename);
}

function ensureSchoolDataFiles(schoolId) {
  const folder = schoolFolder(schoolId);
  ensureDir(folder);

  const defaults = [
    ["students.json", []],
    ["teachers.json", []],
    ["sessions.json", []],
    ["attendance.json", []],
  ];

  for (const [file, def] of defaults) {
    const fp = schoolFile(schoolId, file);
    if (!fs.existsSync(fp)) writeJson(fp, def);
  }
}

module.exports = {
  readJson,
  writeJson,
  genId,
  schoolFile,
  ensureSchoolDataFiles,
};
