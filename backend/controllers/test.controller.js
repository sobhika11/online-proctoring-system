const Test = require("../models/Test");

exports.createTest = async (req, res) => {
  try {
    const test = new Test({
      ...req.body,
      userId: req.user._id
    });

    await test.save();

    return res.status(201).json({
      message: "Test created successfully",
      test
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.userCreatedTests = async (req, res) => {
  try {
    const tests = await Test.find({ userId: req.user._id });

    return res.status(200).json({
      count: tests.length,
      tests
    });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch tests"
    });
  }
};


exports.testRegister = async (req, res) => {
  try {
    return res.status(200).json({ message: "testRegister controller" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.testAdminData = async (req, res) => {
  try {
    return res.status(200).json({ message: "testAdminData controller" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
