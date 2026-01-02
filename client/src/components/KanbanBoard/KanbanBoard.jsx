import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { getTasks, updateTask } from '../../thunks/taskThunk';
import Column from '../Column/Column';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.task);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('todo');
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleOpenCreateModal = (status) => {
    setSelectedStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const statusColumns = [
    { key: 'todo', label: 'To Do', color: '#6366f1' },
    { key: 'in-progress', label: 'In Progress', color: '#8b5cf6' },
    { key: 'done', label: 'Done', color: '#10b981' },
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id;
    let newStatus = over.id;

    // Find the dragged task
    const draggedTask = tasks.find((t) => t.id === taskId);
    if (!draggedTask) return;

    // If dropped on another task, find that task's status
    if (!statusColumns.find((col) => col.key === newStatus)) {
      const targetTask = tasks.find((t) => t.id === newStatus);
      if (targetTask) {
        newStatus = targetTask.status;
      } else {
        return; // Invalid drop target
      }
    }

    // If status hasn't changed, do nothing
    if (draggedTask.status === newStatus) return;

    // Update task status
    setIsUpdating(true);
    try {
      await dispatch(
        updateTask({
          id: taskId,
          updateObj: { status: newStatus },
        })
      ).unwrap();
    } catch (error) {
      console.error('Failed to update task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-container">
        <div className="board-main">
          <div className="board-header">
            <h2 className="board-title">Kanban Dashboard</h2>
          </div>

          <div className="board-columns">
            {statusColumns.map((column) => {
              const columnTasks = getTasksByStatus(column.key);
              return (
                <Column
                  key={column.key}
                  column={column}
                  tasks={columnTasks}
                  onAddTask={handleOpenCreateModal}
                  onEditTask={handleEditTask}
                />
              );
            })}
          </div>
        </div>

        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          defaultStatus={selectedStatus}
        />

        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="task-card dragging">
            <div className="task-title">{activeTask.title}</div>
            {activeTask.description && (
              <div className="task-description">{activeTask.description}</div>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;

