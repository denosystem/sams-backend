const crypto = require("crypto");

// Put a strong secret in .env later.
// For now it can run with default.
const SECRET = process.env.SAMS_SECRET || "CHANGE_THIS_SECRET_NOW_123";

function signToken(payloadObj) {
  const payload = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;

  const [payload, sig] = token.split(".");
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("base64url");

  if (sig !== expected) return null;

  try {
    const obj = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    return obj;
  } catch {
    return null;
  }
}

module.exports = { signToken, verifyToken };
