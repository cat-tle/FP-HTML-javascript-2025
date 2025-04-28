
// Making array to store tasks
const taskList = [];


// Event listener for submit
document.getElementById('form').addEventListener('submit', function (event) {

    // Preventing the page from refreshing.
    event.preventDefault();

    // Getting values from form
    const task_name = document.getElementById('taskname').value;
    const priority = document.getElementById('dropdown').value;
    const importance = document.getElementById('important_check').checked;

    // Check for invalid entry
    if (task_name == '') {
        alert('Please enter a task.');
        return;
    }

    // Generating todays date and formattating it.
    const today = new Date();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;

    // Creating object to be put in array, id and isCompleted have placeholder values.
    let task = {
        id: 0,
        name: task_name,
        priority: priority,
        isImportant: importance,
        isCompleted: 'false',
        date: formattedDate
    }

    taskList.push(task);

    // Creating row for task
    const task_table = document.getElementById('taskmanager').getElementsByTagName('tbody')[0];
    const newTask = task_table.insertRow();

    // Getting index for task list array
    newTask.dataset.index = taskList.length - 1;

    // Creating cells
    const taskCell = newTask.insertCell(0);
    const priorityCell = newTask.insertCell(1);
    const dateCell = newTask.insertCell(2);
    const optionCell = newTask.insertCell(3);

    // Filling in task and priority cell with user input
    taskCell.innerHTML = task_name;
    priorityCell.innerHTML = priority;

    // Filling date cell with the formatted date
    dateCell.innerHTML = formattedDate;

    // This is the if statement that checks for important tasks and fills the row in with red
    if (document.getElementById('important_check').checked) {
        newTask.classList.add('important');
    }

    // Creating a completed checkbox element
    const completeCheck = document.createElement('input');
    completeCheck.type = 'checkbox';
    

    // Adding event listener to checkbox that strikes through the text if completed.
    completeCheck.addEventListener('change', function () {
        if (completeCheck.checked) {
            newTask.classList.add('strike');
            task.isCompleted = 'true';
            console.log(JSON.stringify(taskList));
           
        }
        else {
            newTask.classList.remove('strike');
            console.log(JSON.stringify(taskList));
            task.isCompleted = 'false'
        }
    })

    // Added complete checkbox to cell
    optionCell.appendChild(completeCheck);

    // Creating a delete button element
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Delete";

    // Adding event listener to button that deletes from the table and removes task from array
    deleteButton.addEventListener('click', function () {
        const rowIndex = newTask.dataset.index;
        taskList.splice(rowIndex, 1);

        task_table.removeChild(newTask);
        console.log(JSON.stringify(taskList));
        // Function to update array index
        updateRowIndexes();
    })
    // Adding delete button to cell
    optionCell.appendChild(deleteButton);

    // Updating placeholder id in array and outputting to console
    task.id = newTask.dataset.index;
    console.log(JSON.stringify(taskList));

    // Clearing the forms
    document.getElementById('form').reset();



})

function updateRowIndexes() {
    const task_table = document.getElementById('taskmanager').getElementsByTagName('tbody')[0];
    const rows = task_table.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        rows[i].dataset.index = i;
    }
}