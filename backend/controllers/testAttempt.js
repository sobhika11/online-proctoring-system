const TestAttempt = require("../models/testAttempt");
const Test = require("../models/test");
const { lockAnswers } = require("./answer.controller");
const { evaluateAttempt } = require("./evaluation.controller");

exports.startTest = async (req, res) => {
  try {
    const { test_code } = req.params;
    const userId = req.user._id;
    const test = await Test.findOne({ test_code });
    if (!test) {
      return res.status(404).json({ msg: "Test not found" });
    }
    const now = new Date();

    // TIME CONTROL - can't start before start_time or after end_time
    if (now < test.start_time) {
      return res.status(403).json({ msg: "Exam not started yet" });
    }
    if (now > test.end_time) {
      return res.status(403).json({ msg: "Exam has ended" });
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
      startedAt: now
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

    const now = new Date();

    // Time control: auto-submit if past end_time
    if (now > test.end_time) {
      attempt.status = "AUTO_SUBMITTED";
      attempt.submittedAt = test.end_time;
      await attempt.save();
      // Lock answers and evaluate
      await lockAnswers(attempt._id);
      await evaluateAttempt(attempt._id);
      return res.status(403).json({ msg: "Time over, exam auto-submitted" });
    }

    // Avg duration enforcement
    const diffMinutes = (now - attempt.startedAt) / 1000 / 60; // in minutes
    if (diffMinutes < test.avg_duration) {
      // simulate admin notification
      console.log(` Admin Alert: Student ${userId} tried to submit early for test ${test.test_code}`);

      return res.status(403).json({
        msg: `You can't submit yet. Minimum exam duration is ${test.avg_duration} minutes.`
      });
    }

    // submit
    attempt.status = "SUBMITTED";
    attempt.submittedAt = now;
    await attempt.save();
    // Lock answers and evaluate
    await lockAnswers(attempt._id);
    await evaluateAttempt(attempt._id);
    return res.status(200).json({ msg: "Test submitted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
