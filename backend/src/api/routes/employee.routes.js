const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller");
const upload = require("../../middlewares/multer.middleware");
const {
  validate,
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../validators/employee.validator.js");

const router = express.Router();

router
  .route("/")
  .post(
    upload.single("photo"),
    createEmployeeValidator(),
    validate,
    createEmployee
  )
  .get(getAllEmployees);

router
  .route("/:id")
  .get(getEmployeeById)
  .patch(
    upload.single("photo"),
    updateEmployeeValidator(),
    validate,
    updateEmployee
  )
  .delete(deleteEmployee);

module.exports = router;
