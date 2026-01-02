import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../TaskCard/TaskCard';
import './Column.css';

const Column = ({ column, tasks, onAddTask, onEditTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.key,
  });

  return (
    <div className="board-column">
      <div
        className="column-header"
        style={{ backgroundColor: column.color }}
      >
        <span className="column-title">{column.label}</span>
        <button
          className="add-task-btn"
          title="Add Task"
          onClick={() => onAddTask(column.key)}
        >
          +
        </button>
      </div>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`column-content ${isOver ? 'drag-over' : ''}`}
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEditTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;

