// Load tasks from Local Storage when the page loads
window.onload = function() {
    loadTasks();
};

// Add a new task
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();
    
    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    li.innerHTML = `
        <span class="task-text">${taskValue}</span>
        <input type="checkbox" onclick="toggleCompletion(this)">
        <button class="delete" onclick="removeTask(this)">X</button>
    `;

    taskList.appendChild(li);
    saveTasks(); // Save to Local Storage

    taskInput.value = ""; // Clear input field
}

// Remove a task
function removeTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks(); // Save after removal
}

// Mark a task as completed
function toggleCompletion(checkbox) {
    let li = checkbox.parentElement;
    li.classList.toggle("completed");
    saveTasks(); // Save after completing a task
}

// Save tasks to Local Storage
function saveTasks() {
    let tasks = [];
    let taskList = document.getElementById("taskList").children;
    
    for (let task of taskList) {
        let taskObj = {
            text: task.querySelector(".task-text").innerText,
            completed: task.classList.contains("completed")
        };
        tasks.push(taskObj);
    }
    
    localStorage.setItem("tasks", JSON.stringify(tasks));  // Save as JSON string
}

// Load tasks from Local Storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    for (let task of tasks) {
        let taskList = document.getElementById("taskList");
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <input type="checkbox" onclick="toggleCompletion(this)" ${task.completed ? "checked" : ""}>
            <button class="delete" onclick="removeTask(this)">X</button>
        `;
        
        if (task.completed) {
            li.classList.add("completed");
        }
        
        taskList.appendChild(li);
    }
}
