// Initialize tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Function to render the task list
// function renderTaskList() {
//     $("#todo-cards, #in-progress-cards, #done-cards").empty();
//     taskList.forEach(task => {
//         $(`#${task.status}-cards`).append(`<div>${task.title}</div>`);
//     });
// }

// Render initial task list

// Function to create a task card
function createTaskCard(task) {
    const dueDate = dayjs(task.dueDate);
    let cardColor = '';
    if (dueDate.isBefore(dayjs(), 'day')) {
        cardColor = 'bg-danger';
    } else if (dueDate.isBefore(dayjs().add(3, 'day'), 'day')) {
        cardColor = 'bg-warning';
    }
    return `
        <div class="card task-card mb-3 ${cardColor}" data-id="${task.id}">
            <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text"><small class="text-muted">Due: ${dueDate.format('YYYY-MM-DD')}</small></p>
            <button class="btn btn-danger btn-sm delete-task">Delete</button>
            </div>
        </div>
        `;
    // const taskCard = $('<div>')
    //     .addClass('card task-card mb-3 ', cardColor)
    //     .attr('data-id', task.Id);
    // const cardBody = $('<div>').addClass('card-body');
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    // Clear existing tasks in the columns
    $("#todo-cards, #in-progress-cards, #done-cards").empty();

    // Loop through taskList and append each task to its respective column
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
    });

    // Make task cards draggable
    $(".task-card").draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            $(ui.helper).addClass("dragging");
        },
        stop: function (event, ui) {
            $(ui.helper).removeClass("dragging");
        }
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = $("#taskTitle").val();
    const dueDate = $("#taskDueDate").val();
    const description = $("#taskDescription").val();

    if (title && dueDate) {
        const newTask = {
            id: generateTaskId(),
            title,
            dueDate,
            description,
            status: "to-do"
        };

        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        localStorage.setItem("nextId", JSON.stringify(nextId));

        renderTaskList();
        $("#formModal").modal("hide");
        $("#taskForm")[0].reset();
    }
}

// Function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest(".task-card").data("id");
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.draggable.data("id");
    const newStatus = $(this).attr("id").replace("-cards", "");
    const task = taskList.find(task => task.id === taskId);
    task.status = newStatus;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $("#taskForm").on("submit", handleAddTask);
    $(document).on("click", ".delete-task", handleDeleteTask);

    $(".lane").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker();
});
