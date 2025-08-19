const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const employeeService = require("../services/employee.service.js");

const createEmployee = asyncHandler(async (req, res) => {
  const employee = await employeeService.createEmployee(req.body, req.file);
  return res
    .status(201)
    .json(new ApiResponse(201, employee, "Employee created successfully"));
});

const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  return res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees retrieved successfully"));
});

const getEmployeeById = asyncHandler(async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee retrieved successfully"));
});

const updateEmployee = asyncHandler(async (req, res) => {
  const updatedEmployee = await employeeService.updateEmployee(
    req.params.id,
    req.body,
    req.file
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee updated successfully")
    );
});

const deleteEmployee = asyncHandler(async (req, res) => {
  await employeeService.deleteEmployee(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Employee deleted successfully"));
});

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
