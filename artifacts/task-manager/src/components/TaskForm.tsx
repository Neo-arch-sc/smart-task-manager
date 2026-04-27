import { useState } from "react";
import type { Priority, Task } from "../types";

interface TaskFormProps {
  onAdd: (task: Omit<Task, "id" | "completed" | "createdAt">) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAdd({
      title: trimmedTitle,
      description: description.trim(),
      priority,
    });

    // reset the form after adding
    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form__input"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="task-form__textarea"
        placeholder="Add a description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />

      <div className="task-form__row">
        <label className="task-form__label">
          Priority:
          <select
            className="task-form__select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <button type="submit" className="task-form__button">
          Add Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
