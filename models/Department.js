const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
    name: { type: String, required: true },
    hodUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

DepartmentSchema.index({ schoolId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Department", DepartmentSchema);
