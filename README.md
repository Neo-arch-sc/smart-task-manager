# Smart Task Manager

A modern and responsive task management web application built with React.js. This project helps users efficiently manage their daily tasks with a clean and intuitive interface.

---

## Features

- Add, edit, and delete tasks
- Mark tasks as completed or active
- Filter tasks (All / Active / Completed)
- Persistent data storage using Local Storage
- Responsive and user-friendly UI
- Component-based architecture

---

## Tech Stack

- React.js
- TypeScript (TS)
- HTML5 & CSS3
- Local Storage API

---

## Project Structure
 Smart Task Manager (React)
 
artifacts/task-manager/
├── index.html
├── package.json          ← TypeScript & @types/* removed
├── vite.config.js        ← was vite.config.ts
├── public/
└── src/
    ├── main.jsx          ← was main.tsx
    ├── App.jsx           ← was App.tsx
    ├── index.css
    ├── components/
    │   ├── TaskForm.jsx
    │   ├── TaskList.jsx
    │   ├── TaskItem.jsx
    │   └── FilterBar.jsx
    └── utils/
        └── storage.js
