const taskInput = document.querySelector("input");
const addBtn = document.querySelector("button");
const taskList = document.querySelector('[aria-label="Task List"]');

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const renderTasks = () => {
    taskList.innerHTML = "";
    todos.forEach((task, index) => {
        const article = document.createElement("article");
        article.className =
            "flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm";

        article.innerHTML = `
      <span class="text-gray-800">${task}</span>
      <div class="flex gap-2">
        <button title="Edit" onclick="editTask(${index})" class="hover:scale-110 transition-transform">
          <img src="https://cdn-icons-png.flaticon.com/512/84/84380.png" alt="Edit Icon" class="w-5 h-5" />
        </button>
        <button title="Delete" onclick="deleteTask(${index})" class="hover:scale-110 transition-transform">
          <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete Icon" class="w-5 h-5" />
        </button>
      </div>
    `;

        taskList.appendChild(article);
    });
};

const addTask = () => {
    const task = taskInput.value.trim();
    if (task === "") return;

    todos.push(task);
    localStorage.setItem("todos", JSON.stringify(todos));
    taskInput.value = "";
    renderTasks();
};

const deleteTask = (index) => {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTasks();
};

const editTask = (index) => {
    const newTask = prompt("Edit your task:", todos[index]);
    if (newTask !== null && newTask.trim() !== "") {
        todos[index] = newTask.trim();
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTasks();
    }
};

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

renderTasks();
