const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { readJson, writeJson } = require("../utils/jsonDb");

const dataFile = path.join(__dirname, "..", "data", "teachers.json");

function validateTeacher(body) {
  const errors = [];
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const department = (body.department || "").trim();
  const role = (body.role || "teacher").trim().toLowerCase();

  if (!name) errors.push("name is required");
  if (!email) errors.push("email is required");
  if (!department) errors.push("department is required");
  if (!["teacher", "hod"].includes(role)) errors.push("role must be teacher or hod");

  return { ok: errors.length === 0, errors, cleaned: { name, email, phone, department, role } };
}

// GET /teachers
const getTeachers = (req, res) => {
  const teachers = readJson(dataFile, []);
  res.json({ count: teachers.length, teachers });
};

// GET /teachers/:id
const getTeacherById = (req, res) => {
  const teachers = readJson(dataFile, []);
  const teacher = teachers.find((t) => t.id === req.params.id);
  if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  res.json(teacher);
};

// POST /teachers
const addTeacher = (req, res) => {
  const teachers = readJson(dataFile, []);
  const check = validateTeacher(req.body);

  if (!check.ok) {
    return res.status(400).json({ message: "Validation error", errors: check.errors });
  }

  const exists = teachers.some((t) => t.email.toLowerCase() === check.cleaned.email.toLowerCase());
  if (exists) return res.status(409).json({ message: "email already exists" });

  const newTeacher = {
    id: uuidv4(),
    ...check.cleaned,
    createdAt: new Date().toISOString()
  };

  teachers.push(newTeacher);
  writeJson(dataFile, teachers);

  res.status(201).json({ message: "Teacher added", teacher: newTeacher });
};

// PUT /teachers/:id
const updateTeacher = (req, res) => {
  const teachers = readJson(dataFile, []);
  const index = teachers.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Teacher not found" });

  const patch = {};
  if (req.body.name !== undefined) patch.name = String(req.body.name).trim();
  if (req.body.email !== undefined) patch.email = String(req.body.email).trim();
  if (req.body.phone !== undefined) patch.phone = String(req.body.phone).trim();
  if (req.body.department !== undefined) patch.department = String(req.body.department).trim();
  if (req.body.role !== undefined) patch.role = String(req.body.role).trim().toLowerCase();

  if (patch.role && !["teacher", "hod"].includes(patch.role)) {
    return res.status(400).json({ message: "role must be teacher or hod" });
  }

  if (patch.email) {
    const dup = teachers.some(
      (t) => t.id !== req.params.id && t.email.toLowerCase() === patch.email.toLowerCase()
    );
    if (dup) return res.status(409).json({ message: "email already exists" });
  }

  const updated = {
    ...teachers[index],
    ...patch,
    updatedAt: new Date().toISOString()
  };

  if (updated.name === "" || updated.email === "" || updated.department === "") {
    return res.status(400).json({ message: "name/email/department cannot be empty" });
  }

  teachers[index] = updated;
  writeJson(dataFile, teachers);

  res.json({ message: "Teacher updated", teacher: updated });
};

// DELETE /teachers/:id
const deleteTeacher = (req, res) => {
  const teachers = readJson(dataFile, []);
  const index = teachers.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Teacher not found" });

  const removed = teachers.splice(index, 1)[0];
  writeJson(dataFile, teachers);

  res.json({ message: "Teacher deleted", teacher: removed });
};

module.exports = {
  getTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacher
};
