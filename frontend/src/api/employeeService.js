import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getEmployees = () => apiClient.get("/employees");

export const createEmployee = (employeeData) => {
  return apiClient.post("/employees", employeeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEmployee = (id, employeeData) => {
  return apiClient.patch(`/employees/${id}`, employeeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteEmployee = (id) => apiClient.delete(`/employees/${id}`);
