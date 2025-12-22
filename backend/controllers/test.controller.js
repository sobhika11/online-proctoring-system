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


const testRegister = async (req, res) => {
  try {
    const { test_code } = req.params;
    const userId = req.user.id;

    if (!test_code) {
      return res.status(400).json({ msg: "Test code is required" });
    }

    const test = await Test.findOne({ test_code });
    if (!test) {
      return res.status(404).json({ msg: "Invalid test code" });
    }

    const user = await User.findById(userId);

    if (user.test_code === test_code) {
      return res.status(400).json({ msg: "You are already registered for this test" });
    }

    // Register student
    user.test_code = test_code;
    await user.save();

    res.status(200).json({ msg: "Successfully registered for the test" });

  } catch (error) {
    res.status(500).json({
      msg: "Error while registering for test",
      error: error.message
    });
  }
};
exports.testAdminData = async (req, res) => {
  try {
    return res.status(200).json({ message: "testAdminData controller" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
