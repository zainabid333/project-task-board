let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Function to generate a unique task id
function generateTaskId() {
    return nextId++;
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
