const Session = require("../models/Session");
const Attendance = require("../models/Attendance");

const { toCsv } = require("../utils/csv");
const { buildAttendancePdf } = require("../utils/pdf");

const exportSessionCsv = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ _id: sessionId, schoolId: req.user.schoolId }).lean();
    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

    if (req.user.role === "TEACHER" && String(session.teacherId) !== String(req.user._id)) {
      return res.status(403).json({ ok: false, error: "Not your session" });
    }

    const records = await Attendance.find({ sessionId })
      .populate("studentId", "fullName admissionNo className")
      .lean();

    const rows = records.map((r) => ({
      fullName: r.studentId?.fullName || "",
      admissionNo: r.studentId?.admissionNo || "",
      className: r.studentId?.className || "",
      status: r.status,
      checkedInAt: r.checkedInAt ? new Date(r.checkedInAt).toISOString() : "",
      method: r.method
    }));

    const csv = toCsv(rows);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="session-${sessionId}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const exportSessionPdf = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findOne({ _id: sessionId, schoolId: req.user.schoolId }).lean();
    if (!session) return res.status(404).json({ ok: false, error: "Session not found" });

    if (req.user.role === "TEACHER" && String(session.teacherId) !== String(req.user._id)) {
      return res.status(403).json({ ok: false, error: "Not your session" });
    }

    const records = await Attendance.find({ sessionId })
      .populate("studentId", "fullName admissionNo className")
      .sort({ checkedInAt: 1 })
      .lean();

    const rows = records.map((r) => ({
      fullName: r.studentId?.fullName || "",
      admissionNo: r.studentId?.admissionNo || "",
      className: r.studentId?.className || "",
      status: r.status,
      checkedInAt: r.checkedInAt ? new Date(r.checkedInAt).toLocaleString() : ""
    }));

    const pdf = await buildAttendancePdf({
      title: "SAMS Attendance Report",
      meta: {
        Session: sessionId,
        Subject: session.subject,
        Class: session.className,
        Status: session.status,
        "Created At": new Date(session.createdAt).toLocaleString()
      },
      rows
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="session-${sessionId}.pdf"`);
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

module.exports = { exportSessionCsv, exportSessionPdf };
