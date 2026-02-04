const path = require("path");
const crypto = require("crypto");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const studentsFile = path.join(__dirname, "../data/students.json");

function genId(prefix = "stu") {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

const getStudents = (req, res) => {
  const students = readJSON(studentsFile, []);
  const mySchoolId = req.school.id;

  const filtered = students.filter((s) => s.schoolId === mySchoolId);

  res.json({
    message: "Students fetched successfully",
    school: req.school,
    count: filtered.length,
    students: filtered
  });
};

const addStudent = (req, res) => {
  const mySchoolId = req.school.id;

  const { fullName, admissionNo, className, phone } = req.body || {};
  if (!fullName || !admissionNo) {
    return res.status(400).json({ message: "fullName and admissionNo are required" });
  }

  const students = readJSON(studentsFile, []);

  // prevent duplicates per school
  const exists = students.find(
    (s) => s.schoolId === mySchoolId && String(s.admissionNo).toLowerCase() === String(admissionNo).toLowerCase()
  );
  if (exists) return res.status(409).json({ message: "Student already exists for this school (admissionNo)" });

  const newStudent = {
    id: genId("student"),
    schoolId: mySchoolId,
    fullName,
    admissionNo,
    className: className || null,
    phone: phone || null,

    // biometrics placeholder (we will update later in mobile app)
    biometric: {
      fingerprintTemplate: null,
      faceTemplate: null,
      updatedAt: null
    },

    createdAt: new Date().toISOString()
  };

  students.push(newStudent);
  writeJSON(studentsFile, students);

  res.status(201).json({
    message: "Student added",
    student: newStudent
  });
};

module.exports = {
  getStudents,
  addStudent
};
