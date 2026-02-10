const mongoose = require("mongoose");

const BiometricSchema = new mongoose.Schema(
  {
    studentId: { type: String, required: true, unique: true },
    templateHash: { type: String, required: true }, // placeholder for real biometric template
  },
  { timestamps: true }
);

module.exports = mongoose.model("Biometric", BiometricSchema);
