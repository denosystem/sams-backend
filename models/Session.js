const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    // who created the session (teacher)
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // optional: if session belongs to a department/class/subject
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },
    subject: { type: String, default: "" },

    // QR + check-in security
    qrToken: { type: String, required: true },
    qrExpiresAt: { type: Date, required: true },

    // location + distance (meters)
    location: {
      enabled: { type: Boolean, default: true },
      lat: { type: Number, default: null },
      lng: { type: Number, default: null },
      radiusMeters: { type: Number, default: 120 }, // allowed distance
    },

    // attendance rules
    rules: {
      allowLateMinutes: { type: Number, default: 10 },
      markLateAfterMinutes: { type: Number, default: 10 },
      lockAfterMinutes: { type: Number, default: 60 },
    },

    // running state
    status: {
      type: String,
      enum: ["ACTIVE", "ENDED"],
      default: "ACTIVE",
    },

    endedAt: { type: Date, default: null },

    // optional: biometric requirement
    biometricRequired: { type: Boolean, default: false },
  },
  { timestamps: true }
);

SessionSchema.index({ schoolId: 1, teacherId: 1, status: 1 });
SessionSchema.index({ qrToken: 1 }, { unique: true });

module.exports = mongoose.model("Session", SessionSchema);
