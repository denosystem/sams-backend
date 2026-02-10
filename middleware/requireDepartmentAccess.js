module.exports = function requireDepartmentAccess() {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ ok: false, message: "Not authenticated" });
    }

    const role = (user.role || "").toUpperCase();

    // MASTER_ADMIN + ADMIN can bypass department restriction
    if (role === "MASTER_ADMIN" || role === "ADMIN") return next();

    const requestDeptId =
      req.params.departmentId || req.body.departmentId || req.query.departmentId;

    if (!requestDeptId) return next();

    const userDeptId = String(user.departmentId || "");

    if (!userDeptId) {
      return res.status(403).json({
        ok: false,
        message: "User has no departmentId assigned",
      });
    }

    if (String(requestDeptId) !== userDeptId) {
      return res.status(403).json({
        ok: false,
        message: "Access denied: different department",
      });
    }

    next();
  };
};
