exports.registerBiometric = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Biometric registered (placeholder)"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyBiometric = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Biometric verified (placeholder)"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
