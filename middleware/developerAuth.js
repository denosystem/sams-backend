module.exports = function developerAuth(req, res, next) {
  const key =
    req.headers["x-master-key"] ||
    req.headers["x-dev-key"] ||
    req.headers["authorization"];

  const masterKey = process.env.MASTER_ADMIN_KEY;
  const devKey = process.env.DEV_API_KEY;

  const cleanKey =
    typeof key === "string" ? key.replace(/^Bearer\s+/i, "").trim() : "";

  if (cleanKey && (cleanKey === masterKey || cleanKey === devKey)) {
    return next();
  }

  return res.status(401).json({
    ok: false,
    message: "Unauthorized. Provide x-master-key or Bearer token.",
  });
};
