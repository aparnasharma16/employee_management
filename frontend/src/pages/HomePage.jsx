import { useState } from "react";
import Header from "../components/Header";
import EmployeeCard from "../components/EmployeeCard";
import Modal from "../components/common/Modal";
import ConfirmModal from "../components/common/ConfirmModal";
import EmployeeForm from "../components/EmployeeForm";
import { useEmployee } from "../hooks/useEmployee";
import Loader from "../components/common/Loader";
import { Users } from "lucide-react";

const HomePage = () => {
  const {
    employees,
    loading,
    error,
    addEmployee,
    editEmployee,
    removeEmployee,
  } = useEmployee();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleOpenFormModal = () => setIsFormModalOpen(true);
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  const handleAddEmployeeClick = () => {
    setEditingEmployee(null);
    handleOpenFormModal();
  };

  const handleEditEmployeeClick = (employee) => {
    setEditingEmployee(employee);
    handleOpenFormModal();
  };

  const handleDeleteEmployeeClick = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      removeEmployee(employeeToDelete);
    }
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const handleFormSubmit = async (employeeData, id) => {
    const success = id
      ? await editEmployee(id, employeeData)
      : await addEmployee(employeeData);

    if (success) {
      handleCloseFormModal();
    }
  };

  return (
    <div className="container">
      <Header onAddEmployee={handleAddEmployeeClick} />
      <main>
        {loading && <Loader />}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <>
            {employees.length > 0 ? (
              <div className="employee-list">
                {employees.map((employee) => (
                  <EmployeeCard
                    key={employee._id}
                    employee={employee}
                    onEdit={handleEditEmployeeClick}
                    onDelete={handleDeleteEmployeeClick}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Users size={64} className="empty-state-icon" />
                <h2>No Employees Found</h2>
                <p>Get started by adding a new employee to your team.</p>
              </div>
            )}
          </>
        )}
      </main>

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseFormModal}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete this employee? This action cannot be undone.`}
      />
    </div>
  );
};

export default HomePage;
