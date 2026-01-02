const express = require("express");
const router = express.Router();

const {
  startTest,
  submitTest
} = require("../controllers/testAttempt");

const { authRole } = require("../middleware/validate");

router.post(
  "/start/:test_code",
  authRole(["student"]),
  startTest
);

router.post(
  "/submit/:test_code",
  authRole(["student"]),
  submitTest
);

module.exports = router;
