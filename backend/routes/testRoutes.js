const express = require("express");
const authenticate = require("../middleware/auth"); 
const router = express.Router();
const {
  createTest,
  userCreatedTests,
  testRegister,
  testAdminData,
  adminReview
} = require("../controllers/test.controller");

const {
  validateCreateTest,
  validateTestCodeParam,
  authRole
} = require("../middleware/validate");

// Main part -Admin creates test
router.post(
  "/create",
  authenticate,      
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

// Admin review route
router.get("/admin/:test_code/review", authRole(["admin"]), adminReview);

// This is for Student registers for test
router.post(
  "/register/:test_code",
  authenticate,
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
