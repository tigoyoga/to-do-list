// Select element
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.querySelector(".fa-circle-plus");
const empty = document.querySelector(".empty");

// Make variables for classes names
const CHECK = "fa-circle-check";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "lineThrough";
let LIST = [],
  id = 0;

// Function to add a task
function addTask(task, id, done, trash) {
  if (trash) {
    return;
  } // If trash is true (deleted) then don't run the code

  const DONE = done ? CHECK : UNCHECK; //  Check if the task is done or not and add the class accordingly
  const LINE = done ? LINE_THROUGH : ""; //  Check if the task is done or not and add the class accordingly

  // Create li element
  const item =
    '<li class="item">' +
    '<i class="fa-solid ' +
    DONE +
    ' co" job="complete" id="' +
    id +
    '"></i>' +
    '<p class="text ' +
    LINE +
    ' ">' +
    task +
    "</p>" +
    '<i class="fa-solid fa-trash-can de" job="delete" id="' +
    id +
    '"></i>' +
    "</li>";

  const position = "beforeend"; // Set the position of the element

  list.insertAdjacentHTML(position, item); // Add task to the end of the list (after last child)
}

// Add task to the list when the user presses the enter key
document.addEventListener("keypress", function (event) {
  if (event.keyCode == "13") {
    const task = input.value; // Get the value of the input
    if (task) {
      // If the input is not empty
      addTask(task, id, false, false);

      LIST.push({
        name: task,
        id: id,
        done: false,
        trash: false,
      }); // Add task to the list

      id++; // Increment id

      // Delete empty text when the tasks isn't empty
      if (list.childElementCount > 0) {
        empty.style.display = "none"; // Hide the element
      }
    }
    input.value = ""; // Clear the input
  }
});

// Add task to the list when the user click the add button
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-circle-plus")) {
    const task = input.value; // Get the value of the input
    if (task) {
      // If the input is not empty
      addTask(task, id, false, false);

      LIST.push({
        name: task,
        id: id,
        done: false,
        trash: false,
      }); // Add task to the list

      id++; // Increment id

      // Delete empty text when the tasks isn't empty
      if (list.childElementCount > 0) {
        empty.style.display = "none"; // Hide the element
      }
    }
    input.value = ""; // Clear the input
  }
});

// Function to complete a task
function completeTask(element) {
  element.classList.toggle(CHECK); // Toggle the class
  element.classList.toggle(UNCHECK); // Toggle the class
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH); // Toggle the class
  LIST[element.id].done = LIST[element.id].done ? false : true; // Toggle the value of the done property
}

// Function to delete a task
function removeTask(element) {
  element.parentNode.parentNode.removeChild(element.parentNode); // Remove the parent of the parent of the element
  LIST[element.id].trash = true; // Set the trash property to true
  if (list.childElementCount == 0) {
    empty.style.display = "block"; // Hide the element
  }
}

// Check condition of the task and run the function
list.addEventListener("click", function (event) {
  const element = event.target; // Get the element clicked
  const elementJob = element.attributes.job.value; // Get the job of the element

  if (elementJob == "complete") {
    // If the job is completed
    completeTask(element);
  } else if (elementJob == "delete") {
    // If the job is deleted
    removeTask(element);
  }
});

// Clear all tasks
clear.addEventListener("click", function () {
  localStorage.clear(); // Clear the local storage
  location.reload(); // Reload the page
});
