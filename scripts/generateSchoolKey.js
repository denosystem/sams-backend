require("dotenv").config();
const crypto = require("crypto");
const path = require("path");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const licensesFile = path.join(__dirname, "../data/licenses.json");

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : null;
}

const master = arg("master");
const schoolName = arg("name");
const contactEmail = arg("email") || "";
const contactPhone = arg("phone") || "";

if (!process.env.DEV_MASTER_SECRET) {
  console.log("❌ Missing DEV_MASTER_SECRET in backend/.env");
  process.exit(1);
}

if (!master || master !== process.env.DEV_MASTER_SECRET) {
  console.log("❌ Invalid --master secret");
  process.exit(1);
}

if (!schoolName) {
  console.log('❌ Usage: node scripts/generateSchoolKey.js --master "SECRET" --name "School Name" --email "a@b.com" --phone "+254..."');
  process.exit(1);
}

const licenses = readJSON(licensesFile, []);

const schoolId = crypto.randomBytes(8).toString("hex");
const key = "SCH_" + crypto.randomBytes(24).toString("hex"); // long key

const newLicense = {
  id: crypto.randomUUID(),
  schoolId,
  schoolName,
  key,
  status: "active",
  contactEmail,
  contactPhone,
  createdAt: new Date().toISOString(),
  revokedAt: null,
};

licenses.push(newLicense);
writeJSON(licensesFile, licenses);

console.log("✅ School key generated:");
console.log("School:", schoolName);
console.log("SchoolId:", schoolId);
console.log("Key:", key);
console.log("Status:", newLicense.status);
