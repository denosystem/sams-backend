const { readJson, writeJson, genId, schoolFile, ensureSchoolDataFiles } = require("../utils/jsonDb");

/**
 * GET /students
 * Header: x-school-key: SCH-xxxx
 */
const getStudents = (req, res) => {
  const schoolId = req.school.schoolId;

  // make sure this school has its own JSON files created
  ensureSchoolDataFiles(schoolId);

  const studentsFile = schoolFile(schoolId, "students.json");
  const students = readJson(studentsFile, []);

  res.json({
    message: "Students fetched successfully",
    schoolId,
    count: students.length,
    students,
  });
};

/**
 * POST /students
 * Header: x-school-key: SCH-xxxx
 * body: { fullName, admissionNo, classId OR classes:[...], ... }
 */
const addStudent = (req, res) => {
  const schoolId = req.school.schoolId;

  ensureSchoolDataFiles(schoolId);

  const studentsFile = schoolFile(schoolId, "students.json");
  const students = readJson(studentsFile, []);

  const body = req.body || {};

  // Basic validation (you can expand later)
  if (!body.fullName) {
    return res.status(400).json({ message: "fullName is required" });
  }
  if (!body.admissionNo) {
    return res.status(400).json({ message: "admissionNo is required" });
  }

  // Prevent duplicates inside the SAME school
  const exists = students.find((s) => s.admissionNo === body.admissionNo);
  if (exists) {
    return res.status(409).json({
      message: "Student with that admissionNo already exists in this school",
      student: exists,
    });
  }

  const newStudent = {
    id: genId("stu"),
    schoolId, // ✅ ties the record to the school
    createdAt: new Date().toISOString(),
    ...body,
  };

  students.push(newStudent);
  writeJson(studentsFile, students);

  res.status(201).json({
    message: "Student added",
    student: newStudent,
  });
};

module.exports = {
  getStudents,
  addStudent,
};
