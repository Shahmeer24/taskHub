const TaskManager = {
  elements: {
    taskList: document.getElementById("taskList"),
    taskForm: document.getElementById("taskForm"),
    taskDetailsForm: document.getElementById("taskDetailsForm"),
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.getElementById("themeIcon"),
  },
  tasksData: JSON.parse(localStorage.getItem("tasksData")) || {},

  init() {
    this.initializeTheme();

    if (this.elements.taskList) {
      this.setupTaskEventListeners();
      this.displayTasks();
      this.toggleNoTasksMessage();
    }
  },

  // Theme Management
  initializeTheme() {
    if (this.elements.themeToggle && this.elements.themeIcon) {
      const savedTheme = localStorage.getItem("theme") || "light";
      document.body.classList.toggle("dark-theme", savedTheme === "dark");
      this.elements.themeIcon.className =
        savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

      this.elements.themeToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-theme");
        this.elements.themeIcon.className = isDark
          ? "fas fa-sun"
          : "fas fa-moon";
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }
  },

  // Task Data Management
  saveTasksToLocalStorage() {
    localStorage.setItem("tasksData", JSON.stringify(this.tasksData));
  },

  // Task Display
  displayTasks() {
    this.elements.taskList.innerHTML = "";

    // Sorting tasks by priority
    const sortedTasks = Object.entries(this.tasksData).sort(
      ([idA, taskA], [idB, taskB]) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
      }
    );

    // Create task elements
    sortedTasks.forEach(([taskId, task]) => {
      const taskTab = document.createElement("div");
      taskTab.className = `task-tab bg-${task.priority} mb-3 ${
        task.completed ? "completed" : ""
      }`;
      taskTab.setAttribute("data-task-id", taskId);
      taskTab.innerHTML = `
    <div>
      <strong>${task.date} - ${task.title}</strong>
    </div>
    <div>
      <input type="checkbox" class="form-check-input checkbox-large me-2" ${
        task.completed ? "checked" : ""
      } title="Mark as Complete">
      <button class="btn btn-info btn-sm view-task" title="View Task Details" ${
        task.completed ? "disabled" : ""
      }>
        <i class="fas fa-eye"></i>
      </button>
      <button class="btn btn-danger btn-sm delete-task" title="Delete Task">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
      this.elements.taskList.appendChild(taskTab);
    });

    this.toggleNoTasksMessage();
  },

  // Task Event Handlers
  setupTaskEventListeners() {
    this.elements.taskForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleTaskCreation();
    });

    this.elements.taskList.addEventListener("click", (event) => {
      if (event.target.closest(".view-task")) {
        this.handleViewTask(event);
      } else if (event.target.closest(".delete-task")) {
        this.handleDeleteTask(event);
      }
    });

    this.elements.taskList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        this.handleTaskCompletionToggle(event);
      }
    });

    this.elements.taskDetailsForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleTaskUpdate();
    });
  },

  // Task Operations
  handleTaskCreation() {
    const title = document.getElementById("taskTitle").value;
    const priority = document.getElementById("taskPriority").value;
    const date = new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-")
      .toUpperCase();

    const taskId = Date.now();
    this.tasksData[taskId] = {
      title,
      priority,
      date,
      completed: false,
      description: "",
    };

    this.saveTasksToLocalStorage();
    this.displayTasks();
    this.elements.taskForm.reset();

    const modal = bootstrap.Modal.getInstance(
      document.getElementById("taskModal")
    );
    modal.hide();
  },

  handleViewTask(event) {
    const taskId = event.target
      .closest(".task-tab")
      .getAttribute("data-task-id");
    const task = this.tasksData[taskId];
    const modal = document.getElementById("taskDetailsModal");
    modal.setAttribute("data-current-task-id", taskId);

    document.getElementById("detailsTitle").value = task.title;
    document.getElementById("detailsDate").value = task.date;
    document.getElementById("detailsPriority").value = task.priority;
    document.getElementById("detailsDescription").value = task.description;

    new bootstrap.Modal(modal).show();
  },

  handleTaskUpdate() {
    const modal = document.getElementById("taskDetailsModal");
    const taskId = modal.getAttribute("data-current-task-id");

    if (!taskId || !this.tasksData[taskId]) return;
    const task = this.tasksData[taskId];
    task.title = document.getElementById("detailsTitle").value;
    task.description = document.getElementById("detailsDescription").value;
    task.priority = document.getElementById("detailsPriority").value;

    this.saveTasksToLocalStorage();
    this.displayTasks();

    bootstrap.Modal.getInstance(modal).hide();
  },

  handleDeleteTask(event) {
    const taskId = event.target
      .closest(".task-tab")
      .getAttribute("data-task-id");
    if (confirm("Are you sure you want to delete this task?")) {
      delete this.tasksData[taskId];
      this.saveTasksToLocalStorage();
      this.displayTasks();
    }
  },

  handleTaskCompletionToggle(event) {
    const taskId = event.target.closest(".task-tab").getAttribute("data-task-id");
    this.tasksData[taskId].completed = event.target.checked;
    this.saveTasksToLocalStorage();
    
    const taskTab = event.target.closest(".task-tab");
    const viewButton = taskTab.querySelector('.view-task');
    
    if (event.target.checked) {
      taskTab.classList.add("completed");
      viewButton.disabled = true;
    } else {
      taskTab.classList.remove("completed");
      viewButton.disabled = false;
    }
  },

  toggleNoTasksMessage() {
    let noTasksMessage = document.getElementById("noTasksMessage");
    if (!noTasksMessage) {
      noTasksMessage = document.createElement("div");
      noTasksMessage.id = "noTasksMessage";
      noTasksMessage.textContent =
        "yayy, no tasks left! Hit + to create a task.";
      document.body.appendChild(noTasksMessage);
    }

    noTasksMessage.style.display =
      Object.keys(this.tasksData).length === 0 ? "block" : "none";
  },
};

// Initialization
document.addEventListener("DOMContentLoaded", () => TaskManager.init());
