const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    // sender (ADMIN / HOD / TEACHER)
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    senderRole: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "HOD", "TEACHER"],
      required: true,
    },

    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },

    // Targeting modes
    target: {
      type: String,
      enum: ["SCHOOL", "DEPARTMENT", "CLASS", "TEACHER_CLASS", "USER"],
      required: true,
    },

    // optional targets
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class", default: null },

    // if sending to single user
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    // audience filter (who should receive)
    audience: {
      type: String,
      enum: ["ALL", "STUDENTS", "TEACHERS"],
      default: "ALL",
    },

    // delivery options
    channels: {
      inApp: { type: Boolean, default: true },
      email: { type: Boolean, default: false },
    },

    // email tracking
    emailStatus: {
      type: String,
      enum: ["NOT_SENT", "SENT", "FAILED"],
      default: "NOT_SENT",
    },

    // soft delete
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

NotificationSchema.index({ schoolId: 1, createdAt: -1 });
NotificationSchema.index({ schoolId: 1, target: 1, departmentId: 1, classId: 1 });
NotificationSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", NotificationSchema);
