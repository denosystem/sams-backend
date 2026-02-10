module.exports = function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    const role = req.user?.role;

    if (!role) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Normalize: allow both ADMIN and "admin"
    const allowed = allowedRoles.map((r) => String(r).toLowerCase());
    const userRole = String(role).toLowerCase();

    if (!allowed.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};
