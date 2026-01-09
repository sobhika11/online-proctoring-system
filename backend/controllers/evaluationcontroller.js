const Answer = require("../models/answer");
const TestAttempt = require("../models/testAttempt");
const Question = require("../models/question");
const Test = require("../models/test");

// Evaluate answers and calculate scores
exports.evaluateAttempt = async (attemptId) => {
  try {
    const attempt = await TestAttempt.findById(attemptId)
      .populate("testId");
    if (!attempt) {
      throw new Error("Attempt not found");
    }
    // Prevent double evaluation
    if (attempt.evaluation && attempt.evaluation.evaluatedAt) {
      return {
        correctCount: attempt.evaluation.correctCount,
        wrongCount: attempt.evaluation.wrongCount,
        unansweredCount: attempt.evaluation.unansweredCount,
        totalScore: attempt.evaluation.totalScore,
        maxMarks: attempt.evaluation.maxMarks,
        percentage: attempt.evaluation.percentage
      };
    }
  