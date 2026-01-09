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

    