import { Trash2, Edit, User, Mail, MapPin, Cake } from "lucide-react";

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const { name, email, photo, address, age } = employee;

  return (
    <div className="employee-card">
      <div className="card-header">
        {photo?.url ? (
          <img src={photo.url} alt={name} className="employee-photo" />
        ) : (
          <div className="employee-photo-placeholder">
            <User size={64} />
          </div>
        )}
        <div className="employee-actions">
          <button
            onClick={() => onEdit(employee)}
            className="action-btn edit-btn"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(employee._id)}
            className="action-btn delete-btn"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <h3 className="employee-name">{name}</h3>
        <p className="employee-info">
          <Mail size={14} /> {email}
        </p>
        {age && (
          <p className="employee-info">
            <Cake size={14} /> {age} years old
          </p>
        )}
        {address && (
          <p className="employee-info">
            <MapPin size={14} /> {address}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
