const getStudents = (req, res) => {
  res.json({
    message: "Students fetched successfully",
    students: []
  });
};

const addStudent = (req, res) => {
  const student = req.body; // whatever you send from Postman/Frontend

  // for now we just return what was sent
  res.status(201).json({
    message: "Student added successfully",
    student
  });
};

module.exports = { getStudents, addStudent };
