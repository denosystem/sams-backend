module.exports = function requireAnyRole(roles = []) {
  const allowed = roles.map((r) => String(r).toUpperCase());

  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ ok: false, message: "Not authenticated" });
    }

    const role = (user.role || "").toUpperCase();

    if (!allowed.includes(role)) {
      return res.status(403).json({
        ok: false,
        message: `Access denied. Allowed: ${allowed.join(" / ")}`,
      });
    }

    next();
  };
};
