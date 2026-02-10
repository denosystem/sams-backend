const Notification = require("../models/Notification");
const User = require("../models/User");
const Department = require("../models/Department");


const { sendMail } = require("../utils/mailer");

// helper: get recipients by target
async function resolveRecipients({ schoolId, target, departmentId, classId, userId, audience }) {
  // audience: ALL / STUDENTS / TEACHERS
  let roleFilter = {};
  if (audience === "STUDENTS") roleFilter = { role: "STUDENT" };
  if (audience === "TEACHERS") roleFilter = { role: "TEACHER" };

  if (target === "USER") {
    const u = await User.findOne({ _id: userId, schoolId });
    return u ? [u] : [];
  }

  if (target === "SCHOOL") {
    return await User.find({ schoolId, ...roleFilter }).select("_id email role");
  }

  if (target === "DEPARTMENT") {
    return await User.find({ schoolId, departmentId, ...roleFilter }).select("_id email role");
  }

  if (target === "CLASS" || target === "TEACHER_CLASS") {
    // if you don’t have classId yet, it will return empty.
    return await User.find({ schoolId, classId, ...roleFilter }).select("_id email role");
  }

  return [];
}

// POST /notifications/send
exports.sendNotification = async (req, res) => {
  try {
    const sender = req.user; // from requireAuth
    const { title, message, target, departmentId, classId, userId, audience, channels } = req.body;

    if (!title || !message || !target) {
      return res.status(400).json({ ok: false, error: "title, message, target required" });
    }

    // validate target
    const allowedTargets = ["SCHOOL", "DEPARTMENT", "CLASS", "TEACHER_CLASS", "USER"];
    if (!allowedTargets.includes(target)) {
      return res.status(400).json({ ok: false, error: "Invalid target" });
    }

    // HOD restriction: only within their department (unless target USER and user is within dept)
    if (sender.role === "HOD") {
      if (!sender.departmentId) {
        return res.status(403).json({ ok: false, error: "HOD missing departmentId" });
      }
      if (target === "SCHOOL") {
        return res.status(403).json({ ok: false, error: "HOD cannot notify whole school" });
      }
      if (target === "DEPARTMENT" && String(departmentId) !== String(sender.departmentId)) {
        return res.status(403).json({ ok: false, error: "HOD can only notify own department" });
      }
      if (target === "USER") {
        const u = await User.findById(userId);
        if (!u || String(u.departmentId) !== String(sender.departmentId)) {
          return res.status(403).json({ ok: false, error: "HOD can only notify users in own department" });
        }
      }
    }

    // TEACHER restriction: only own class (TEACHER_CLASS) or USER
    if (sender.role === "TEACHER") {
      if (target !== "TEACHER_CLASS" && target !== "USER") {
        return res.status(403).json({ ok: false, error: "Teacher can notify own class or single user only" });
      }
    }

    // Create notification record
    const doc = await Notification.create({
      schoolId: sender.schoolId,
      senderId: sender._id,
      senderRole: sender.role,
      title,
      message,
      target,
      departmentId: departmentId || null,
      classId: classId || null,
      userId: userId || null,
      audience: audience || "ALL",
      channels: {
        inApp: channels?.inApp !== false,
        email: channels?.email === true,
      },
      emailStatus: "NOT_SENT",
    });

    // Optionally send email
    if (doc.channels.email) {
      const recipients = await resolveRecipients({
        schoolId: sender.schoolId,
        target: doc.target,
        departmentId: doc.departmentId,
        classId: doc.classId,
        userId: doc.userId,
        audience: doc.audience,
      });

      const emails = recipients.map((r) => r.email).filter(Boolean);

      if (emails.length) {
        try {
          await sendMail({
            to: emails,
            subject: `[SAMS] ${title}`,
            text: message,
          });
          doc.emailStatus = "SENT";
          await doc.save();
        } catch (e) {
          doc.emailStatus = "FAILED";
          await doc.save();
        }
      }
    }

    return res.json({ ok: true, data: doc });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};

// GET /notifications/school
exports.listNotifications = async (req, res) => {
  try {
    const u = req.user;
    const items = await Notification.find({ schoolId: u.schoolId, deleted: false })
      .sort({ createdAt: -1 })
      .limit(200);
    return res.json({ ok: true, data: items });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};

// GET /notifications/me
exports.myNotifications = async (req, res) => {
  try {
    const u = req.user;

    // simple: return last 200 notifications that match user scope
    // (SCHOOL always included; DEPARTMENT if same dept; CLASS if same class; USER if userId matches)
    const q = {
      schoolId: u.schoolId,
      deleted: false,
      $or: [
        { target: "SCHOOL" },
        { target: "DEPARTMENT", departmentId: u.departmentId || null },
        { target: "CLASS", classId: u.classId || null },
        { target: "TEACHER_CLASS", classId: u.classId || null },
        { target: "USER", userId: u._id },
      ],
    };

    const items = await Notification.find(q).sort({ createdAt: -1 }).limit(200);
    return res.json({ ok: true, data: items });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};

// POST /notifications/read/:id
exports.markRead = async (req, res) => {
  try {
    // Keep it simple for now: return OK (frontend can store locally)
    return res.json({ ok: true, message: "marked read (client side for now)" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
};
