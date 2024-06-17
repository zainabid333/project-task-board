// Initialize tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
}


// Function to create a task card
function createTaskCard(task) {
    const dueDate = dayjs(task.dueDate);
    const taskCard = $('<div>')
        .addClass('card task-card mb-3')
        .attr('data-id', task.id);

    if (dueDate.isBefore(dayjs(), 'day')) {
        taskCard.addClass('bg-danger text-white');
    } else if (dueDate.isBefore(dayjs().add(3, 'day'), 'day')) {
        taskCard.addClass('bg-warning');
    }

    const cardBody = $('<div>').addClass('card-body');
    const cardTitle = $('<h5>').addClass('card-title').text(task.title);
    const cardText = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').html(`<small>Due: ${dueDate.format('YYYY-MM-DD')}</small>`);
    const deleteBtn = $('<button>').addClass('btn btn-danger btn-sm delete-task').text('Delete');

    cardBody.append(cardTitle, cardText, cardDueDate, deleteBtn);
    taskCard.append(cardBody);

    return taskCard;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
    console.log("Rendering tasks:", taskList);
    $("#todo-cards, #in-progress-cards, #done-cards").empty();
    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
    });

    $(".task-card").draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const title = $("#taskTitle").val().trim();
    const dueDate = $("#taskDueDate").val();
    const description = $("#taskDescription").val().trim();

    if (title && dueDate) {
        const newTask = {
            id: generateTaskId(),
            title,
            dueDate,
            description,
            status: "todo"
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
    const targetLaneId = $(this).attr("id");
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        let newStatus;
        switch (targetLaneId) {
            case "to-do":
                newStatus = "todo";
                break;
            case "in-progress":
                newStatus = "in-progress";
                break;
            case "done":
                newStatus = "done";
                break;
            default:
                break;
        }

        taskList[taskIndex].status = newStatus;
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
    }
}
// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#taskForm").on("submit", handleAddTask);
    $(document).on("click", ".delete-task", handleDeleteTask);

    $("#to-do, #in-progress, #done").droppable({
        accept: ".task-card",
        drop: handleDrop
    });

    $("#taskDueDate").datepicker({
        changeMonth: true,
        changeYear: true,
    });
});