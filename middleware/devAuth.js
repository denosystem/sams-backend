module.exports = function devAuth(req, res, next) {
  const devKey = process.env.DEV_API_KEY;
  const provided = req.headers["x-dev-key"];

  if (!devKey) {
    return res.status(500).json({ message: "DEV_API_KEY not set in .env" });
  }

  if (!provided || provided !== devKey) {
    return res.status(401).json({ message: "Unauthorized (invalid x-dev-key)" });
  }

  next();
};
