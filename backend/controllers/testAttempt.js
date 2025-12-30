const TestAttempt = require("../models/TestAttempt");
const Test = require("../models/test");

exports.startTest = async (req, res) => {
  try {
    const { test_code } = req.params;
    const userId = req.user._id;

    const test = await Test.findOne({ test_code });
    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }

    const existingAttempt = await TestAttempt.findOne({
      testId: test._id,
      userId
    });

    if (existingAttempt) {
      return res.status(400).json({ msg: "Test already started" });
    }

    const attempt = new TestAttempt({
      testId: test._id,
      userId,
      status: "STARTED",
      startedAt: new Date()
    });

    await attempt.save();

    return res.status(201).json({ msg: "Test started", attempt });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.submitTest = async (req, res) => {
  try {
    const { test_code } = req.params;
    const userId = req.user._id;

    const test = await Test.findOne({ test_code });
    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }

    const attempt = await TestAttempt.findOne({
      testId: test._id,
      userId
    });

    if (!attempt) {
      return res.status(404).json({ msg: "Test not started" });
    }

    if (attempt.status !== "STARTED") {
      return res.status(400).json({ msg: "Test already submitted" });
    }

    attempt.status = "SUBMITTED";
    attempt.submittedAt = new Date();

    await attempt.save();

    return res.status(200).json({ msg: "Test submitted" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
