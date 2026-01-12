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

