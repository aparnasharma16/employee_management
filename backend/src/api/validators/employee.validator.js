const { body, validationResult } = require("express-validator");
const ApiError = require("../../utils/ApiError");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  throw new ApiError(422, "Validation failed", extractedErrors);
};

const createEmployeeValidator = () => [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must only contain alphabets and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),

  body("address").optional().isString().withMessage("Address must be a string"),
];

const updateEmployeeValidator = () => [
  body("name")
    .optional()
    .trim()
    .isString()
    .withMessage("Name must be a string")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must only contain alphabets and spaces"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("dateOfBirth")
    .optional()
    .isISO8601()
    .withMessage("Date of birth must be a valid date (YYYY-MM-DD)"),

  body("address").optional().isString().withMessage("Address must be a string"),
];

module.exports = {
  validate,
  createEmployeeValidator,
  updateEmployeeValidator,
};
