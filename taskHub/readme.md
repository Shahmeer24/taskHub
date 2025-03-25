# taskHub

## Overview
**taskHub** is a simple, interactive task manager application designed to help users manage their tasks efficiently. This project allows users to:

- Create, update, and delete tasks dynamically.
- Set task priorities (High, Medium, Low) which automatically assign colors to tasks.
- View and edit detailed information for each task in a modal.
- Mark tasks as completed with a checkbox.
- Experience persistent data storage using the browser's `localStorage`.
- Toggle between light and dark themes, with preferences saved across sessions.
- Get notified with a friendly message when there are no tasks left.

The application is fully responsive and supports both desktop and mobile browsers.

---

## Features

### Core Functionalities
- **Add Task**: Users can add tasks by specifying a title and priority.
- **Task Sorting**: Tasks are sorted automatically by priority (High > Medium > Low).
- **Task Details**: Each task has a details view where users can edit the description and priority.
- **Delete Confirmation**: Users are prompted to confirm before deleting tasks.
- **Dark Mode**: A theme toggle button allows switching between light and dark modes, with the preference saved to `localStorage`.
- **Persistent Storage**: Tasks and theme preferences are saved in `localStorage`, ensuring data persists across browser sessions.
- **No Tasks Left Message**: Displays a motivational message when no tasks are left, encouraging users to add more tasks.

---

## Technologies Used

### Frontend
- **HTML**: Provides the structure of the application, including modals and buttons.
- **CSS**: Adds styling and theming for both light and dark modes.
- **Bootstrap**: Used for responsive design and pre-styled components like modals and buttons.
- **FontAwesome**: Adds intuitive icons for actions like delete, view, and toggle theme.

### Backend (Client-Side)
- **JavaScript**:
  - Handles dynamic task creation, updates, and deletion.
  - Implements `localStorage` for data persistence.
  - Manages theme toggling and event handling.

---

## How to Run
1. Clone the repository from GitHub.
2. Open `index.html` in any modern web browser.

---

## Future Improvements
- Add deadline support for tasks.
- Integrate drag-and-drop functionality to rearrange tasks.
- Enable task syncing across devices using a backend service.

---

## Contact
For feedback or queries, feel free to [email us](mailto:shahmeermondal1576@gmail.com).

