const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validate } = require("../middleware/validation");
const { body } = require("express-validator");

const signupValidationRules = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidationRules = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

router.post("/signup", signupValidationRules, validate, authController.signup);
router.post("/login", loginValidationRules, validate, authController.login);

module.exports = router;
