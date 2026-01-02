import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../thunks/taskThunk';
import './EditTaskModal.css';

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'todo',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateTask({
          id: task.id,
          updateObj: formData,
        })
      ).unwrap();
      onClose();
    } catch (err) {
      setError(err || 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await dispatch(deleteTask(task.id)).unwrap();
      onClose();
    } catch (err) {
      setError(err || 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting && !isDeleting) {
      setError(null);
      onClose();
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Edit Task</h3>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            disabled={isSubmitting || isDeleting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter task title"
              disabled={isSubmitting || isDeleting}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter task description (optional)"
              rows="4"
              disabled={isSubmitting || isDeleting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
              disabled={isSubmitting || isDeleting}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-delete"
              disabled={isSubmitting || isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            <div className="form-actions-right">
              <button
                type="button"
                onClick={handleClose}
                className="btn btn-cancel"
                disabled={isSubmitting || isDeleting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-submit"
                disabled={isSubmitting || isDeleting}
              >
                {isSubmitting ? 'Updating...' : 'Update Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;

