const TestAttempt = require("../models/testAttempt");
const Test = require("../models/test");
const { lockAnswers } = require("./answercontroller");
const { evaluateAttempt } = require("./evaluationcontroller");

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
