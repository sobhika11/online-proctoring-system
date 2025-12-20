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
router.post(
  "/create",
  authRole(["admin"]),
  validateCreateTest,
  createTest
);
router.post("/create", validateCreateTest, createTest);
router.get("/my-tests", userCreatedTests);
router.post("/register/:test_code", validateTestCodeParam, testRegister);
router.get("/admin/:test_code", validateTestCodeParam, testAdminData);

module.exports = router;
