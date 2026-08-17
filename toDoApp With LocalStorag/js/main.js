let input = document.querySelector(".input");
let button = document.querySelector(".add");
let taskList = document.querySelector(".tasks");
// Empty array to store tasks

let tasks = [];

// check if there are tasks in local storage and load them to the page

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

// trigger getDataFromLocalStorage function to load tasks from local storage when the page is loaded
getDataFromLocalStorage();
// add task

button.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ""; // clear the input field
  }
};

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(), // date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
    title: taskText,
    completed: false,
  };
  // push the task to the array of tasks
  tasks.push(task);
  addTaskToPage(tasks);
  // add task to local storage
  addDataToLocalStorage(tasks);
}
// click on task element
taskList.addEventListener("click", (e) => {
  // Delete task
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();

    removeTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }

  // Complete task
  if (e.target.classList.contains("complete")) {
    toggleTaskComplete(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.classList.toggle("done");

    addDataToLocalStorage(tasks);
  }
});
// remove task from local storage
function removeTaskFromLocalStorage(taskId) {
  tasks = tasks.filter((task) => task.id != taskId); // filter the array of tasks to remove the task with the given id
  addDataToLocalStorage(tasks); // update local storage with the new array of tasks
}
function addTaskToPage(tasks) {
  // empty the task list
  taskList.innerHTML = "";
  // load tasks from the array of tasks
  tasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed) {
      div.className = "task done"; // add done class to the task div for styling
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Done button
    let doneButton = document.createElement("span");
    doneButton.className = "complete";
    doneButton.appendChild(document.createTextNode("Done"));

    // Delete button
    let deleteButton = document.createElement("span");
    deleteButton.className = "del";
    deleteButton.appendChild(document.createTextNode("Delete"));

    div.appendChild(doneButton);
    div.appendChild(deleteButton);
    taskList.appendChild(div);
  });
}
// setItem takes two parameters, the first is the key and the second is the value. The value must be a string, so we use JSON.stringify to convert the array of tasks to a string.
function addDataToLocalStorage(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  // check if data is not null so we can parse it back to an array of tasks and add it to the page
  if (data) {
    let tasks = JSON.parse(data); // parse the string back to an array of tasks
    addTaskToPage(tasks);
  }
}

function toggleTaskComplete(taskId) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id == taskId) {
      tasks[i].completed = !tasks[i].completed; // toggle the completed property of the task
    }
  }
}
