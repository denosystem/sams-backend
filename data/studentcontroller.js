const getStudents = (req, res) => {
  res.json({
    message: "Students fetched successfully",
    students: []
  });
};

module.exports = { getStudents };
