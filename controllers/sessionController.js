const Session = require("../models/Session");
const Attendance = require("../models/Attendance");
const { makeQrToken, qrToPngBuffer } = require("../utils/qr");
const { distanceMeters } = require("../utils/geo");

const createSession = async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({ ok: false, error: "Only TEACHER can create session" });
    }

    const { className, subject, lat, lng, radiusMeters, lateAfterMinutes, minutesValid } = req.body;

    if (!className || !subject || lat == null || lng == null) {
      return res.status(400).json({ ok: false, error: "className, subject, lat, lng required" });
    }

    const validMins = minutesValid ? Number(minutesValid) : 20;
    const expiresAt = new Date(Date.now() + validMins * 60 * 1000);

    const session = await Session.create({
      schoolId: req.user.schoolId,
      teacherId: req.user._id,
      departmentId: req.user.departmentId || null,
      className,
      subject,
      level: 1,
      qrToken: makeQrToken(),
      expiresAt,
      location: { lat: Number(lat), lng: Number(lng) },
      radiusMeters: radiusMeters ? Number(radiusMeters) : 60,
      lateAfterMinutes: lateAfterMinutes ? Number(lateAfterMinutes) : 10,
      status: "ACTIVE"
    });

    res.status(201).json({
      ok: true,
      session,
      qrPayload: { sessionId: session._id, qrToken: session.qrToken }
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const getSessionQrPng = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ _id: sessionId, schoolId: req.user.schoolId }).lean();
    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

    // teacher can only view their own session
    if (req.user.role === "TEACHER" && String(session.teacherId) !== String(req.user._id)) {
      return res.status(403).json({ ok: false, error: "Not your session" });
    }

    const payload = { sessionId: session._id.toString(), qrToken: session.qrToken };
    const png = await qrToPngBuffer(payload);

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(png);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const endSession = async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") return res.status(403).json({ ok: false, error: "Only TEACHER" });
    const { sessionId } = req.params;

    const session = await Session.findOne({
      _id: sessionId,
      schoolId: req.user.schoolId,
      teacherId: req.user._id
    });

    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

    session.status = "ENDED";
    await session.save();

    res.json({ ok: true, message: "Session ended", session });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const checkIn = async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({ ok: false, error: "Only STUDENT can check in" });
    }

    const { sessionId, qrToken, lat, lng, method } = req.body;
    if (!sessionId || !qrToken || lat == null || lng == null) {
      return res.status(400).json({ ok: false, error: "sessionId, qrToken, lat, lng required" });
    }

    const session = await Session.findOne({ _id: sessionId, schoolId: req.user.schoolId });
    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });
    if (session.status !== "ACTIVE") return res.status(400).json({ ok: false, error: "Session not active" });
    if (new Date() > session.expiresAt) return res.status(400).json({ ok: false, error: "QR expired" });
    if (session.qrToken !== qrToken) return res.status(401).json({ ok: false, error: "Invalid QR token" });

    if (req.user.className !== session.className) {
      return res.status(403).json({ ok: false, error: "Not your class session" });
    }

    const d = distanceMeters(session.location.lat, session.location.lng, Number(lat), Number(lng));
    if (d > session.radiusMeters) {
      return res.status(403).json({ ok: false, error: `Too far from class: ${Math.round(d)}m` });
    }

    const minutesFromStart = Math.floor((Date.now() - session.createdAt.getTime()) / 60000);
    const status = minutesFromStart > session.lateAfterMinutes ? "LATE" : "PRESENT";

    const attendance = await Attendance.create({
      schoolId: req.user.schoolId,
      sessionId: session._id,
      studentId: req.user._id,
      status,
      checkedInAt: new Date(),
      checkinLocation: { lat: Number(lat), lng: Number(lng) },
      method: method || "QR"
    });

    res.status(201).json({ ok: true, message: "Checked in", attendance });
  } catch (err) {
    if (String(err.message).includes("E11000")) {
      return res.status(409).json({ ok: false, error: "Already checked in" });
    }
    res.status(500).json({ ok: false, error: err.message });
  }
};

const listSessionAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ _id: sessionId, schoolId: req.user.schoolId });
    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

    if (req.user.role === "TEACHER" && String(session.teacherId) !== String(req.user._id)) {
      return res.status(403).json({ ok: false, error: "Not your session" });
    }

    const records = await Attendance.find({ sessionId: session._id })
      .populate("studentId", "fullName username admissionNo className")
      .sort({ checkedInAt: 1 })
      .lean();

    res.json({ ok: true, session, records });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

module.exports = { createSession, getSessionQrPng, endSession, checkIn, listSessionAttendance };
