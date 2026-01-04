const express = require("express");
const router = express.Router();

const {
  startTest,
  submitTest
} = require("../controllers/testAttempt");

const { authRole } = require("../middleware/validate");
const authenticate = require("../middleware/auth");

router.post(
  "/start/:test_code",
  authenticate,
  authRole(["student"]),
  startTest
);

router.post(
  "/submit/:test_code",
  authenticate,
  authRole(["student"]),
  submitTest
);

module.exports = router;
