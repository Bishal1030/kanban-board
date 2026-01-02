import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './TaskCard.css';

const TaskCard = ({ task, onEdit }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <div {...listeners} className="task-card-drag-area">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-description">{task.description}</div>
        )}
      </div>
      <div className="task-card-actions">
        <button
          className="task-action-btn task-edit-btn"
          onClick={handleEditClick}
          title="Edit task"
        >
          ✏️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

