import { useState, useEffect } from "react";
import { User, Mail, MapPin, Calendar, Image as ImageIcon } from "lucide-react";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const isEditing = !!employee;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        dateOfBirth: employee.dateOfBirth
          ? new Date(employee.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: employee.address || "",
      });
      setPhotoPreview(employee.photo?.url || null);
    }
  }, [employee, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name must only contain letters and spaces";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    if (photo) {
      data.append("photo", photo);
    }

    await onSubmit(data, employee?._id);
    setIsSubmitting(false);
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">
          <User size={16} /> Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
        />
        {errors.name && <div className="error-msg">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          <Mail size={16} /> Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
        />
        {errors.email && <div className="error-msg">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="dateOfBirth">
          <Calendar size={16} /> Date of Birth
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">
          <MapPin size={16} /> Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St, Anytown"
        />
      </div>

      <div className="form-group">
        <label htmlFor="photo">
          <ImageIcon size={16} /> Photo
        </label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
        {photoPreview && (
          <img src={photoPreview} alt="Preview" className="photo-preview" />
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : isEditing
            ? "Update Employee"
            : "Add Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
