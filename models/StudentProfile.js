const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    admissionNumber: { type: String, required: true, trim: true },

    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },

    level: { type: String, default: "" }, // e.g. Level 4 / Year 2

    // optional guardian info
    guardianName: { type: String, default: "" },
    guardianPhone: { type: String, default: "" },

    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

StudentProfileSchema.index({ schoolId: 1, admissionNumber: 1 }, { unique: true });
StudentProfileSchema.index({ schoolId: 1, departmentId: 1, classId: 1 });

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
