require("dotenv").config();
const path = require("path");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const licensesFile = path.join(__dirname, "../data/licenses.json");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : null;
}

const master = arg("master");
const key = arg("key");

if (!process.env.DEV_MASTER_SECRET) {
  console.log("❌ Missing DEV_MASTER_SECRET in backend/.env");
  process.exit(1);
}

if (!master || master !== process.env.DEV_MASTER_SECRET) {
  console.log("❌ Invalid --master secret");
  process.exit(1);
}

if (!key) {
  console.log('❌ Usage: node scripts/revokeSchoolKey.js --master "SECRET" --key "SCH_..."');
  process.exit(1);
}

const licenses = readJSON(licensesFile, []);
const idx = licenses.findIndex((l) => l.key === key);

if (idx === -1) {
  console.log("❌ Key not found");
  process.exit(1);
}

licenses[idx].status = "revoked";
licenses[idx].revokedAt = new Date().toISOString();
writeJSON(licensesFile, licenses);

console.log("✅ Key revoked:", key);
console.log("School:", licenses[idx].schoolName);
