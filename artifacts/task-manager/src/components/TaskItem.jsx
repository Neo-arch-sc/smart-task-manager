import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);

  function handleSave() {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) return;
    onEdit(task.id, {
      title: trimmedTitle,
      description: editDescription.trim(),
      priority: editPriority,
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <input
          type="text"
          className="task-item__edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <textarea
          className="task-item__edit-textarea"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows={2}
        />
        <div className="task-item__edit-actions">
          <select
            className="task-item__select"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="button"
            className="task-item__button task-item__button--save"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="task-item__button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`task-item priority-${task.priority} ${
        task.completed ? "task-item--completed" : ""
      }`}
    >
      <label className="task-item__checkbox-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__checkbox-custom" />
      </label>

      <div className="task-item__content">
        <div className="task-item__header">
          <h3 className="task-item__title">{task.title}</h3>
          <span className={`task-item__badge badge-${task.priority}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="task-item__description">{task.description}</p>
        )}
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="task-item__button"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="task-item__button task-item__button--delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
