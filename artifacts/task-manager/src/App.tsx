import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import { loadTasks, saveTasks } from "./utils/storage";
import type { Filter, Priority, Task } from "./types";

function App() {
  // Load saved tasks on first render
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [filter, setFilter] = useState<Filter>("all");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  function addTask(newTask: {
    title: string;
    description: string;
    priority: Priority;
  }) {
    const task: Task = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(
    id: string,
    updates: { title: string; description: string; priority: Priority },
  ) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    );
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  // Figure out which tasks to show based on the active filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">Smart Task Manager</h1>
          <p className="app__subtitle">
            Stay organized. Get things done. One task at a time.
          </p>
        </header>

        <main>
          <TaskForm onAdd={addTask} />

          <FilterBar
            currentFilter={filter}
            onChange={setFilter}
            counts={counts}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />

          {counts.completed > 0 && (
            <div className="app__footer-actions">
              <button
                type="button"
                className="app__clear-button"
                onClick={clearCompleted}
              >
                Clear {counts.completed} completed
              </button>
            </div>
          )}
        </main>

        <footer className="app__footer">
          <p>Built with React + TypeScript</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
