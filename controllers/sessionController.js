const path = require("path");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const sessionsFile = path.join(__dirname, "../data/sessions.json");

const startSession = (req, res) => {
  const sessions = readJSON(sessionsFile, []);

  const { classId, teacherId, location } = req.body;

  if (!classId || !teacherId) {
    return res.status(400).json({ message: "classId and teacherId are required" });
  }

  const newSession = {
    id: Date.now().toString(),
    classId,
    teacherId,
    status: "active",
    startedAt: new Date().toISOString(),
    endedAt: null,
    location: location || null
  };

  sessions.push(newSession);
  writeJSON(sessionsFile, sessions);

  return res.status(201).json({
    message: "Session started",
    session: newSession
  });
};

const endSession = (req, res) => {
  const sessions = readJSON(sessionsFile, []);
  const { sessionId } = req.params;

  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return res.status(404).json({ message: "Session not found" });

  session.status = "ended";
  session.endedAt = new Date().toISOString();

  writeJSON(sessionsFile, sessions);

  return res.json({
    message: "Session ended",
    session
  });
};

const getSession = (req, res) => {
  const sessions = readJSON(sessionsFile, []);
  const { sessionId } = req.params;

  const session = sessions.find((s) => s.id === sessionId);
  if (!session) return res.status(404).json({ message: "Session not found" });

  return res.json({ session });
};

module.exports = {
  startSession,
  endSession,
  getSession
};
