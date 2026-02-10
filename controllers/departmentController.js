const Department = require("../models/Department");
const User = require("../models/User");

const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ ok: false, error: "name required" });

    const dept = await Department.create({
      schoolId: req.user.schoolId,
      name,
      active: true
    });

    res.status(201).json({ ok: true, department: dept });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const assignHod = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const { hodUserId } = req.body;

    const dept = await Department.findOne({ _id: departmentId, schoolId: req.user.schoolId });
    if (!dept) return res.status(404).json({ ok: false, error: "Department not found" });

    const hod = await User.findOne({ _id: hodUserId, schoolId: req.user.schoolId, role: "HOD" });
    if (!hod) return res.status(400).json({ ok: false, error: "HOD user not found" });

    dept.hodUserId = hod._id;
    await dept.save();

    // attach hod's departmentId
    hod.departmentId = dept._id;
    await hod.save();

    res.json({ ok: true, department: dept });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

const listDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ schoolId: req.user.schoolId, active: true })
      .sort({ createdAt: -1 })
      .lean();
    res.json({ ok: true, departments });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

module.exports = { createDepartment, assignHod, listDepartments };
