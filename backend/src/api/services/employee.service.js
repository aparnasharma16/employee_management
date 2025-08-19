const Employee = require("../models/employee.model");
const ApiError = require("../../utils/ApiError");
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../../utils/cloudinary");

const createEmployee = async (employeeData, file) => {
  const { name, email, dateOfBirth, address } = employeeData;

  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    throw new ApiError(409, "Employee with this email already exists");
  }

  let photoData = {};
  if (file) {
    const photo = await uploadOnCloudinary(file.path);
    if (!photo) {
      throw new ApiError(500, "Failed to upload photo");
    }
    photoData = { public_id: photo.public_id, url: photo.secure_url };
  }

  const employee = await Employee.create({
    name,
    email,
    dateOfBirth,
    address,
    photo: photoData,
  });

  return employee;
};

const getAllEmployees = async () => {
  return await Employee.find({});
};

const getEmployeeById = async (employeeId) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }
  return employee;
};

const updateEmployee = async (employeeId, updateData, file) => {
  const employee = await getEmployeeById(employeeId);

  Object.assign(employee, updateData);

  if (file) {
    if (employee.photo && employee.photo.public_id) {
      await deleteFromCloudinary(employee.photo.public_id);
    }
    const photo = await uploadOnCloudinary(file.path);
    if (!photo) {
      throw new ApiError(500, "Failed to upload new photo");
    }
    employee.photo = { public_id: photo.public_id, url: photo.secure_url };
  }

  return await employee.save({ validateBeforeSave: true });
};

const deleteEmployee = async (employeeId) => {
  const employee = await getEmployeeById(employeeId);

  if (employee.photo && employee.photo.public_id) {
    await deleteFromCloudinary(employee.photo.public_id);
  }

  await employee.deleteOne();
  return { message: "Employee deleted successfully" };
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
