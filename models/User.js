const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // =============================
    // Core ownership
    // =============================
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null, // students/teachers belong to departments
    },

    // =============================
    // Roles (VERY IMPORTANT)
    // =============================
    role: {
      type: String,
      enum: [
        "STUDENT",
        "TEACHER",
        "HOD",
        "ADMIN",
        "SUPER_ADMIN",
      ],
      required: true,
    },

    // =============================
    // Identity
    // =============================
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    passwordHash: {
      type: String, // hashed password (bcrypt later)
    },

    // =============================
    // Student / Teacher linking
    // =============================
    admissionNumber: {
      type: String,
      default: null, // STUDENT only
    },

    employeeNumber: {
      type: String,
      default: null, // TEACHER / HOD
    },

    classAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null, // for students
    },

    // =============================
    // Biometric support
    // =============================
    biometric: {
      enabled: { type: Boolean, default: false },
      templateHash: { type: String, default: "" },
      updatedAt: { type: Date, default: null },
    },

    // =============================
    // Account flags
    // =============================
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// =============================
// Indexes (performance)
// =============================
UserSchema.index({ school: 1, role: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

module.exports = mongoose.model("User", UserSchema);
