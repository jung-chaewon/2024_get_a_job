const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

function allTasks() {
    let tasks = document.querySelectorAll(".pending");
    pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
    if (tasks.length > 0) {
        todoLists.style.marginTop = "20px";
        clearButton.style.pointerEvents = "auto";
    } else {
        todoLists.style.marginTop = "0px";
        clearButton.style.pointerEvents = "none";
    }
}

inputField.addEventListener("keyup", (e) => {
    let inputVal = inputField.value.trim();
    if (e.key === "Enter" && inputVal.length > 0) {
        let liTag = `<li class="list pending" onclick="handleStatus(this)">
            <input type="checkbox"/>
            <span class="task">${inputVal}</span>
            <i class="uil-trash" onclick="deleteTask(this)"></i>
        </li>`;
        todoLists.insertAdjacentHTML("beforeend", liTag);
        inputField.value = ""; // Clear input field after adding task
        allTasks(); // Update pending task count
    }
});

function handleStatus(e) {
    const checkbox = e.querySelector("input");
    checkbox.checked = !checkbox.checked;
    e.classList.toggle("completed");
    allTasks(); // Update pending task count
}

function deleteTask(e) {
    e.parentElement.remove();
    allTasks(); // Update pending task count
}

clearButton.addEventListener("click", () => {
    todoLists.innerHTML = ""; // Clear all tasks
    allTasks(); // Update pending task count
});