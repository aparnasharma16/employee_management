import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="confirm-modal-content">
        <div className="confirm-modal-icon">
          <AlertTriangle size={48} color="#f59e0b" />
        </div>
        <p>{message}</p>
        <div className="confirm-modal-actions">
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
