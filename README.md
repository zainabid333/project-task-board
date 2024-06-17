# Project Task Board
A Kanban board for task management of projects to keep track of the progress

# Usage
A basic Kanban taskboard to add and manage tasks to view the progress. Progress is managed in three columns To-do, In-progress and completion
# Functionality

### Add project
Add new project for tracking based on there due date using the Add Task button

### Past due
if a task is past due then it will be shown as red in to-do and in progress column but it will turn white when in completed column

### Due today
If a task is due today then it will be displayed as yellow in task board and will turn white when completed

### Due in future
If task is due in future then it will show as white

### Deletion of Task
Once the task is deleted it will be deleted from storage and will not show up in the local storage or browser display

# Functions

### 'generateTaskId()'
Function to generate a unique ID for newly created tasks

### 'createTaskCard()'
Creating new task card based on the data gathered from modal form and appending it to the columns 

### 'renderTaskList()'
Rendering the task cards by reading from local storage and displaying them in the columns and making the cards draggable in three columns

### 'handleAddTask()'
Adding the created task card using form content to the local storage

### 'handleDeleteTask()'
Deleting tasks from storage and updating the display of cards

### 'handleDrop()'
Handling the draggable function to drop the cards into new lanes and removing them from the other lanes

### 'document.ready()'
Function to handle listener on the elements and rendering the tasks on the page from local storage 

# Deployed Link
[Task Board Deployed site](https://zainabid333.github.io/project-task-board)

# Screenshot
### Main page to showcase the tasks added on the board
![Main page](./assets/images/main%20screen.png)

### Form to add new task by title Due Date and Details for tasks
![Project Adding page](./assets/images/adding%20task.png)

### Viewing the added tasks in columns red for past due yellow for due today and white for due in future

![Project Added page](./assets/images/Added%20task.png)