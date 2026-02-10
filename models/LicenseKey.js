const mongoose = require("mongoose");

const LicenseKeySchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },

    keyHash: { type: String, required: true }, // store HASHED key, not raw
    label: { type: String, default: "Main License" },
    isActive: { type: Boolean, default: true },

    createdBy: { type: String, default: "developer" }, // you behind the scenes
  },
  { timestamps: true }
);

// Make sure one school can’t have duplicate keyHash records
LicenseKeySchema.index({ school: 1, keyHash: 1 }, { unique: true });

module.exports = mongoose.model("LicenseKey", LicenseKeySchema);
