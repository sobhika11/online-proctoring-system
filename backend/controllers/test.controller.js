const Test = require("../models/test");
const User = require("../models/user");
const TestAttempt = require("../models/testAttempt");
const Violation = require("../models/violation");
const shortid = require("shortid");
exports.createTest = async (req, res) => {
  try {
    const { test_name, start_time, end_time } = req.body;
    if (!test_name || !start_time || !end_time) {
      return res.status(400).json({ msg: "Required fields missing" });
    }
    const test = new Test({
      test_name,
      start_time,
      end_time,
      test_code: shortid.generate() + "-" + shortid.generate(),
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
    return res.status(500).json({ error: "Failed to fetch tests" });
  }
};

exports.testRegister = async (req, res) => {
  try {
    const { test_code } = req.params;
    const userId = req.user._id;
    if (!test_code) {
      return res.status(400).json({ msg: "Test code is required" });
    }
    const test = await Test.findOne({ test_code });
    if (!test) {
      return res.status(404).json({ msg: "Invalid test code" });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    if (user.test_code === test_code) {
      return res.status(400).json({ msg: "Already registered for this test" });
    }
    user.test_code = test_code;
    await user.save();
    return res.status(200).json({ msg: "Successfully registered for the test" });
  } catch (error) {
    return res.status(500).json({ msg: "Error registering for test", error: error.message });
  }
};
exports.testAdminData = async (req, res) => {
  try {
    const { test_code } = req.params;
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }
    const candidates = await User.find({ test_code });
    return res.status(200).json({ candidates });
  } catch (error) {
    return res.status(500).json({ msg: "Error fetching candidates", error: error.message });
  }
};

exports.adminReview = async (req, res) => {
  try {
    const { test_code } = req.params;
    const test = await Test.findOne({ test_code });
    if (!test) return res.status(404).json({ msg: "Test not found" });
    const attempts = await TestAttempt.find({ testId: test._id })
      .populate("userId", "email role");
    const review = attempts.map(a => ({
      student: a.userId,
      attempt: {
        status: a.status,
        startedAt: a.startedAt,
        submittedAt: a.submittedAt,
        warnings: a.warnings || {}
      }
    }));
    res.status(200).json({ test: test.test_name, review });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
