const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // student is a User with role STUDENT

    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },

    // status: PRESENT / LATE / ABSENT
    status: { type: String, enum: ["PRESENT", "LATE", "ABSENT"], default: "PRESENT" },

    // location proof
    location: {
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      distanceMeters: { type: Number, default: null },
    },

    // QR proof
    qrTokenUsed: { type: String, default: "" },

    // optional biometric proof
    biometric: {
      used: { type: Boolean, default: false },
      result: { type: String, enum: ["PASS", "FAIL", "SKIPPED"], default: "SKIPPED" },
    },

    // times
    checkedInAt: { type: Date, default: Date.now },

    // late minutes
    lateByMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// prevent duplicate check-in per session
AttendanceSchema.index({ sessionId: 1, studentId: 1 }, { unique: true });

// fast queries for teacher live view
AttendanceSchema.index({ sessionId: 1, status: 1 });
AttendanceSchema.index({ schoolId: 1, studentId: 1 });

module.exports = mongoose.model("Attendance", AttendanceSchema);
