import { Plus } from "lucide-react";

const Header = ({ onAddEmployee }) => {
  return (
    <header className="app-header">
      <h1>Employee Management</h1>
      <button className="btn btn-primary" onClick={onAddEmployee}>
        <Plus size={18} />
        Add Employee
      </button>
    </header>
  );
};

export default Header;
