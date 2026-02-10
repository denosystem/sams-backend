module.exports = function requireSchoolAccess() {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ ok: false, message: "Not authenticated" });
    }

    const role = (user.role || "").toUpperCase();

    // MASTER_ADMIN can see all schools
    if (role === "MASTER_ADMIN") return next();

    const requestSchoolId =
      req.params.schoolId || req.body.schoolId || req.query.schoolId;

    // If endpoint doesn't specify schoolId, allow (some routes are personal like /me)
    if (!requestSchoolId) return next();

    const userSchoolId = String(user.schoolId || "");

    if (!userSchoolId) {
      return res.status(403).json({
        ok: false,
        message: "User has no schoolId assigned",
      });
    }

    if (String(requestSchoolId) !== userSchoolId) {
      return res.status(403).json({
        ok: false,
        message: "Access denied: different school",
      });
    }

    next();
  };
};
