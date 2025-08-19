import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import * as api from "../api/employeeService";
import { EmployeeContext } from "./employeeContext";

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getEmployees();
      setEmployees(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch employees.");
      toast.error("Failed to fetch employees.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const addEmployee = async (employeeData) => {
    try {
      const response = await api.createEmployee(employeeData);
      setEmployees((prev) => [...prev, response.data.data]);
      toast.success("Employee added successfully!");
      return true;
    } catch (err) {
      const errorMsg =
        err.response?.data?.errors?.[0]?.email || "Failed to add employee.";
      toast.error(errorMsg);
      console.error(err);
      return false;
    }
  };

  const editEmployee = async (id, employeeData) => {
    try {
      const response = await api.updateEmployee(id, employeeData);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? response.data.data : emp))
      );
      toast.success("Employee updated successfully!");
      return true;
    } catch (err) {
      toast.error("Failed to update employee.");
      console.error(err);
      return false;
    }
  };

  const removeEmployee = async (id) => {
    try {
      await api.deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete employee.");
      console.error(err);
    }
  };

  const value = {
    employees,
    loading,
    error,
    addEmployee,
    editEmployee,
    removeEmployee,
    fetchEmployees,
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
