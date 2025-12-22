const Test = require("../models/Test");

exports.createTest = async (req, res) => {
  try {
    return res.status(200).json({ message: "createTest controller" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
exports.userCreatedTests = async (req, res) => {
  try {
    return res.status(200).json({ message: "userCreatedTests controller" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};