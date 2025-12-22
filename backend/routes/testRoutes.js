const express = require("express");
const router = express.Router();

const {
  createTest,
  userCreatedTests,
  testRegister,
  testAdminData
} = require("../controllers/test.controller");

const {
  validateCreateTest,
  validateTestCodeParam
} = require("../middlewares/validate");

const authRole = require("../middlewares/authRole");

// Main part -Admin creates test
router.post(
  "/create",
  authRole(["admin"]),
  validateCreateTest,
  createTest
);

// This part for Admin views candidates of a test
router.get(
  "/admin/:test_code",
  authRole(["admin"]),
  validateTestCodeParam,
  testAdminData
);

// This is for Student registers for test
router.post(
  "/register/:test_code",
  authRole(["student"]),
  validateTestCodeParam,
  testRegister
);

// This is for Admin views tests created by them
router.get(
  "/my-tests",
  authRole(["admin"]),
  userCreatedTests
);

module.exports = router;
