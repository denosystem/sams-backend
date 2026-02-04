const jwt = require("jsonwebtoken");
const {
  readJson,
  writeJson,
  genId,
  schoolFile,
  ensureSchoolDataFiles,
} = require("../utils/jsonDb");

function required(v, name) {
  if (v === undefined || v === null || v === "") return `${name} is required`;
  return null;
}

function studentInClass(student, classId) {
  if (!student) return false;
  if (student.classId && student.classId === classId) return true;
  if (Array.isArray(student.classes) && student.classes.includes(classId)) return true;
  return false;
}

const startSession = (req, res) => {
  const { teacherId, classId, subject, location, radiusMeters, durationMinutes, lateAfterMinutes } =
    req.body || {};

  const e1 = required(teacherId, "teacherId");
  const e2 = required(classId, "classId");
  const e3 = required(subject, "subject");
  if (e1 || e2 || e3) return res.status(400).json({ message: e1 || e2 || e3 });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ message: "JWT_SECRET missing in backend/.env" });

  const schoolId = req.school.schoolId;
  ensureSchoolDataFiles(schoolId);

  const SESSIONS_FILE = schoolFile(schoolId, "sessions.json");
  const sessions = readJson(SESSIONS_FILE, []);

  const id = genId("sess");
  const now = new Date();

  const duration = Number(durationMinutes || 10);
  const expiresAt = new Date(now.getTime() + duration * 60 * 1000);

  const session = {
    id,
    schoolId,
    teacherId,
    classId,
    subject,

    status: "active",
    startedAt: now.toISOString(),
    endedAt: null,

    expiresAt: expiresAt.toISOString(),
    lateAfterMinutes: Number(lateAfterMinutes || 10),

    location:
      location && typeof location.lat === "number" && typeof location.lng === "number"
        ? { lat: Number(location.lat), lng: Number(location.lng) }
        : null,
    radiusMeters: radiusMeters ? Number(radiusMeters) : null,
  };

  sessions.push(session);
  writeJson(SESSIONS_FILE, sessions);

  const qrToken = jwt.sign(
    {
      type: "SESSION_QR",
      schoolId,
      sessionId: session.id,
      teacherId: session.teacherId,
      classId: session.classId,
      subject: session.subject,
    },
    secret,
    { expiresIn: `${duration}m` }
  );

  return res.status(201).json({
    message: "Session started",
    session,
    qrToken,
    expiresInMinutes: duration,
  });
};

const endSession = (req, res) => {
  const { teacherId, sessionId } = req.body || {};

  const e1 = required(teacherId, "teacherId");
  const e2 = required(sessionId, "sessionId");
  if (e1 || e2) return res.status(400).json({ message: e1 || e2 });

  const schoolId = req.school.schoolId;
  ensureSchoolDataFiles(schoolId);

  const SESSIONS_FILE = schoolFile(schoolId, "sessions.json");
  const STUDENTS_FILE = schoolFile(schoolId, "students.json");
  const ATTENDANCE_FILE = schoolFile(schoolId, "attendance.json");

  const sessions = readJson(SESSIONS_FILE, []);
  const students = readJson(STUDENTS_FILE, []);
  const attendance = readJson(ATTENDANCE_FILE, []);

  const s = sessions.find((x) => x.id === sessionId);
  if (!s) return res.status(404).json({ message: "Session not found" });

  if (s.teacherId !== teacherId) return res.status(403).json({ message: "Not allowed" });
  if (s.status !== "active") return res.status(400).json({ message: "Session already ended" });

  s.status = "ended";
  s.endedAt = new Date().toISOString();
  writeJson(SESSIONS_FILE, sessions);

  const classStudents = students.filter((st) => studentInClass(st, s.classId));

  const checkedInIds = new Set(
    attendance
      .filter((a) => a.sessionId === s.id && (a.status === "present" || a.status === "late"))
      .map((a) => a.studentId)
  );

  let absentsMarked = 0;

  for (const st of classStudents) {
    if (checkedInIds.has(st.id)) continue;

    const exists = attendance.find((a) => a.sessionId === s.id && a.studentId === st.id);
    if (exists) continue;

    attendance.push({
      id: genId("att"),
      schoolId,
      sessionId: s.id,
      studentId: st.id,
      teacherId: s.teacherId,
      classId: s.classId,
      subject: s.subject,

      status: "absent",
      checkedInAt: null,
      markedAt: new Date().toISOString(),

      capture: { lat: null, lng: null, qrVerified: false, biometricProof: null },
    });

    absentsMarked++;
  }

  writeJson(ATTENDANCE_FILE, attendance);

  return res.json({
    message: "Session ended",
    session: s,
    absentsMarked,
  });
};

const getSession = (req, res) => {
  const { sessionId } = req.params;

  const schoolId = req.school.schoolId;
  ensureSchoolDataFiles(schoolId);

  const SESSIONS_FILE = schoolFile(schoolId, "sessions.json");
  const sessions = readJson(SESSIONS_FILE, []);
  const s = sessions.find((x) => x.id === sessionId);

  if (!s) return res.status(404).json({ message: "Session not found" });
  return res.json({ session: s });
};

const getActiveSessionsByTeacher = (req, res) => {
  const { teacherId } = req.params;

  const schoolId = req.school.schoolId;
  ensureSchoolDataFiles(schoolId);

  const SESSIONS_FILE = schoolFile(schoolId, "sessions.json");
  const sessions = readJson(SESSIONS_FILE, []);
  const active = sessions.filter((s) => s.teacherId === teacherId && s.status === "active");

  return res.json({ teacherId, count: active.length, sessions: active });
};

module.exports = { startSession, endSession, getSession, getActiveSessionsByTeacher };
