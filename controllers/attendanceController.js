const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { readJson, writeJson } = require("../utils/jsonDb");
const { verifyToken } = require("../utils/token");
const { withinRadius } = require("../utils/geo");

const attendanceFile = path.join(__dirname, "..", "data", "attendance.json");
const sessionsFile = path.join(__dirname, "..", "data", "sessions.json");
const studentsFile = path.join(__dirname, "..", "data", "students.json");

// Basic biometric “proof” placeholder.
// Later: replace with real WebAuthn verification.
function biometricOk(session, biometric) {
  if (!session.requireBiometric) return { ok: true, reason: "not_required" };
  if (!biometric) return { ok: false, reason: "biometric_required" };

  // MVP accepts any non-empty proof string
  const proof = String(biometric.proof || "").trim();
  if (!proof) return { ok: false, reason: "biometric_proof_missing" };

  return { ok: true, reason: "accepted_mvp" };
}

// POST /attendance/checkin
// body: { sessionToken, studentId, location?, deviceId?, biometric? }
const checkIn = (req, res) => {
  const { sessionToken, studentId, location, deviceId, biometric } = req.body;

  if (!sessionToken) return res.status(400).json({ message: "sessionToken is required" });
  if (!studentId) return res.status(400).json({ message: "studentId is required" });

  // verify session token
  const tokenData = verifyToken(sessionToken);
  if (!tokenData) return res.status(401).json({ message: "Invalid session token" });

  const { sessionId, expiresAt } = tokenData;
  if (!sessionId || !expiresAt) return res.status(401).json({ message: "Bad token payload" });

  // token expiry check
  if (Date.now() > new Date(expiresAt).getTime()) {
    return res.status(410).json({ message: "Session token expired" });
  }

  // load session
  const sessions = readJson(sessionsFile, []);
  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return res.status(404).json({ message: "Session not found" });
  if (!session.active) return res.status(410).json({ message: "Session already ended" });

  // session expiry check (server side)
  if (Date.now() > new Date(session.expiresAt).getTime()) {
    return res.status(410).json({ message: "Session expired" });
  }

  // verify student exists
  const students = readJson(studentsFile, []);
  const student = students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });

  // location check if session has geofence
  let locationResult = { required: false };
  if (session.geofence) {
    locationResult.required = true;

    if (!location || location.lat === undefined || location.lng === undefined) {
      return res.status(400).json({ message: "Location required for this session" });
    }

    const point = { lat: Number(location.lat), lng: Number(location.lng) };
    if ([point.lat, point.lng].some((v) => Number.isNaN(v))) {
      return res.status(400).json({ message: "location.lat and location.lng must be numbers" });
    }

    const radiusM = session.geofence.radiusM;
    const check = withinRadius(
      { lat: session.geofence.lat, lng: session.geofence.lng },
      point,
      radiusM
    );

    locationResult = {
      required: true,
      ok: check.ok,
      distanceM: check.distanceM,
      radiusM
    };

    if (!check.ok) {
      return res.status(403).json({
        message: "Outside allowed location radius",
        locationResult
      });
    }
  }

  // biometric check
  const bio = biometricOk(session, biometric);
  if (!bio.ok) {
    return res.status(403).json({ message: "Biometric verification required", reason: bio.reason });
  }

  // Determine status (present/late) based on time.
  // MVP: late if > 10 minutes after session start.
  const lateAfterMin = 10;
  const startedAtMs = new Date(session.createdAt).getTime();
  const minutesSinceStart = Math.floor((Date.now() - startedAtMs) / 60000);
  const status = minutesSinceStart > lateAfterMin ? "late" : "present";

  const records = readJson(attendanceFile, []);

  // prevent duplicate check-in for same student same session
  const existingIndex = records.findIndex(
    (r) => r.sessionId === sessionId && r.studentId === studentId
  );

  const record = {
    id: existingIndex === -1 ? uuidv4() : records[existingIndex].id,
    sessionId,
    className: session.className,
    teacherId: session.teacherId,
    studentId,
    studentName: student.name,
    regNo: student.regNo,
    status,
    minutesSinceStart,
    deviceId: deviceId ? String(deviceId).trim() : "",
    biometric: session.requireBiometric
      ? { required: true, accepted: true, type: biometric?.type || "mvp", stored: true }
      : { required: false },
    location: locationResult.required
      ? { lat: Number(location.lat), lng: Number(location.lng), distanceM: locationResult.distanceM }
      : null,
    checkedInAt: new Date().toISOString()
  };

  if (existingIndex === -1) {
    records.push(record);
  } else {
    records[existingIndex] = { ...records[existingIndex], ...record, updatedAt: new Date().toISOString() };
  }

  writeJson(attendanceFile, records);

  res.status(existingIndex === -1 ? 201 : 200).json({
    message: existingIndex === -1 ? "Checked in" : "Check-in updated",
    record
  });
};

// GET /attendance/session/:sessionId
const getSessionAttendance = (req, res) => {
  const { sessionId } = req.params;
  const records = readJson(attendanceFile, []);
  const list = records.filter((r) => r.sessionId === sessionId);
  res.json({ sessionId, count: list.length, records: list });
};

// GET /attendance/student/:studentId
const getStudentAttendance = (req, res) => {
  const { studentId } = req.params;
  const records = readJson(attendanceFile, []);
  const list = records.filter((r) => r.studentId === studentId);
  res.json({ studentId, count: list.length, records: list });
};

module.exports = { checkIn, getSessionAttendance, getStudentAttendance };
