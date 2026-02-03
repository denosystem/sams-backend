const path = require("path");
const { readJSON, writeJSON } = require("../utils/jsonDb");

const studentsFile = path.join(__dirname, "../data/students.json");

const getStudents = (req, res) => {
  const students = readJSON(studentsFile, []);
  res.json({
    message: "Students fetched successfully",
    students
  });
};

const addStudent = (req, res) => {
  const students = readJSON(studentsFile, []);
  const newStudent = {
    id: Date.now().toString(),
    ...req.body
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
