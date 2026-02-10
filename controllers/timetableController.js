// backend/controllers/timetableController.js
const Timetable = require("../models/Timetable");

async function upsertTimetable(req, res) {
  try {
    const { schoolId, departmentId, classId, items } = req.body;

    if (!schoolId) return res.status(400).json({ ok: false, message: "schoolId required" });
    if (!Array.isArray(items)) return res.status(400).json({ ok: false, message: "items must be an array" });

    const doc = await Timetable.findOneAndUpdate(
      { schoolId, departmentId: departmentId || null, classId: classId || null },
      { schoolId, departmentId: departmentId || null, classId: classId || null, items },
      { new: true, upsert: true }
    );

    return res.json({ ok: true, timetable: doc });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

async function getTeacherTimetable(req, res) {
  try {
    const { teacherId } = req.params;

    // We store timetable by class/department; teacher can filter client-side by teacherId in items
    const docs = await Timetable.find().sort({ updatedAt: -1 });

    // Return all timetables; frontend can filter where item.teacherId === teacherId
    return res.json({ ok: true, timetables: docs, teacherId });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

async function getStudentTimetable(req, res) {
  try {
    const { studentId } = req.params;

    // Return all timetables; frontend can filter by student classId
    const docs = await Timetable.find().sort({ updatedAt: -1 });

    return res.json({ ok: true, timetables: docs, studentId });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
}

module.exports = {
  upsertTimetable,
  getTeacherTimetable,
  getStudentTimetable,
};
