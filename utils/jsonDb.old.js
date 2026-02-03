const fs = require("fs");
const path = require("path");

function ensureFile(filePath, defaultData) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

function readJson(filePath, defaultData) {
  ensureFile(filePath, defaultData);

  const raw = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(raw);
  } catch (err) {
    // If JSON is broken, reset to default and continue
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

function writeJson(filePath, data) {
  const defaultData = Array.isArray(data) ? [] : {};
  ensureFile(filePath, defaultData);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function genId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`;
}

module.exports = { readJson, writeJson, genId };
