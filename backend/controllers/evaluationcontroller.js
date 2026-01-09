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
    // Get all answers for this attempt
    const answers = await Answer.find({ attemptId: attempt._id });

    // Get all questions for this test
    const questions = await Question.find({ testId: attempt.testId._id });
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    let totalScore = 0;
    let maxMarks = 0;

    // Calculate max marks
    questions.forEach(q => {
      maxMarks += q.marks || 1;
    });
