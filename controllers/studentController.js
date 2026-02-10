const path = require("path");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const studentsFile = path.join(__dirname, "../data/students.json");

const getStudents = (req, res) => {
  const students = readJSON(studentsFile, []);
  const schoolStudents = students.filter(s => s.schoolId === req.school.schoolId);

  res.json({
    message: "Students fetched successfully",
    school: req.school,
    students: schoolStudents,
  });
};

const addStudent = (req, res) => {
  const students = readJSON(studentsFile, []);

  const newStudent = {
    id: Date.now().toString(),
    schoolId: req.school.schoolId,     // ✅ attach school
    ...req.body,
    createdAt: new Date().toISOString()
  };

  students.push(newStudent);
  writeJSON(studentsFile, students);

  res.status(201).json({
    message: "Student added",
    school: req.school,
    student: newStudent,
  });
};

module.exports = {
  getStudents,
  addStudent
};
