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
    // Evaluate each question
    const evaluationDetails = questions.map(question => {
      const answer = answers.find(a => a.questionId.toString() === question._id.toString());
      if (!answer) {
        unansweredCount++;
        return {
          questionId: question._id,
          status: "unanswered",
          selectedOption: null,
          correctOption: question.correctOption,
          marks: 0
        };
      }
      const isCorrect = answer.selectedOption === question.correctOption;
      const marks = isCorrect ? (question.marks || 1) : 0;
      if (isCorrect) {
        correctCount++;
        totalScore += marks;
      } else {
        wrongCount++;
      }
      return {
        questionId: question._id,
        status: isCorrect ? "correct" : "wrong",
        selectedOption: answer.selectedOption,
        correctOption: question.correctOption,
        marks
      };
    });
