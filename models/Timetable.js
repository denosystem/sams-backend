// backend/models/Timetable.js
const mongoose = require("mongoose");

const TimetableItemSchema = new mongoose.Schema(
  {
    day: { type: String, required: true },        // "Mon", "Tue"...
    startTime: { type: String, required: true },  // "08:00"
    endTime: { type: String, required: true },    // "10:00"
    subject: { type: String, required: true },
    teacherId: { type: String },                  // optional
    room: { type: String },                       // optional
  },
  { _id: false }
);

const TimetableSchema = new mongoose.Schema(
  {
    schoolId: { type: String, required: true },
    departmentId: { type: String, default: null },
    classId: { type: String, default: null },

    items: { type: [TimetableItemSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", TimetableSchema);
