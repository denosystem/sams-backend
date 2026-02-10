const rateLimit = require("express-rate-limit");

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP
  message: {
    ok: false,
    error: "Too many requests, try again later",
  },
});

// Email sending limiter (VERY important)
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    ok: false,
    error: "Email limit reached. Try later.",
  },
});

// Notification limiter (school-wide messages)
const notificationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    ok: false,
    error: "Too many notifications sent",
  },
});

module.exports = {
  apiLimiter,
  emailLimiter,
  notificationLimiter,
};
