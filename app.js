//DEFINING UI VARIABLES
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
//Call LoadEventListenersFunctions
loadEventListeners();
//Function declaration
function loadEventListeners() {
    //Loading Tasks stored in Local Storage
    document.addEventListener('DOMContentLoaded', loadTasks);
    //Add task Event
    form.addEventListener('submit', addTask);
    //Remove task Event
    taskList.addEventListener('click', removeTask);
    //Clear tasks Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup',filterTasks);
}
//Function declaration of loadTasks
function loadTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if(tasks.length !== 0) { 
        tasks.forEach(task => {
            //creating a li element
            const li = document.createElement('li');
            //adding className
            li.className = 'collection-item';
            //appending text node
            li.appendChild(document.createTextNode(task));
            //creating a link element
            const link = document.createElement('a');
            //adding className
            link.className = 'delete-item secondary-content';
            //adding icon to link
            link.innerHTML = '<i class="fa fa-remove"></i>';
            //appending link to li
            li.appendChild(link);
            //adding li to ul
            taskList.appendChild(li);
        });
    }
}
//Function declaration of addTask
function addTask(e) {
    //checking of taskInput is empty
    if(taskInput.value == '') {
        alert('Add a Task');
    } else { 
    //creating a li element
    const li = document.createElement('li');
    //adding className
    li.className = 'collection-item';
    //appending text node
    li.appendChild(document.createTextNode(taskInput.value));
    //creating a link element
    const link = document.createElement('a');
    //adding className
    link.className = 'delete-item secondary-content';
    //adding icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //appending link to li
    li.appendChild(link);
    //adding li to ul
    taskList.appendChild(li);
    //Adding to Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //clear the taskInput Value
    taskInput.value = '';
    }
    e.preventDefault();
}
//Function Declaration of storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 
//Function declaration of removeTask
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you Sure?')) {
            e.target.parentElement.parentElement.remove();
            //remove from Local Storage
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
//Function declration of removeFromLocalStorage
function removeFromLocalStorage(textItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach( (task, index) => {
        if(textItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Function declaration of clearTasks
function clearTasks(e) {
    //taskList.innerHTML = '';
    //faster method
    if(confirm('Are you sure?')) {  
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        //Clear from local Storage
        clearAllTasksFromLocalStorage();
    }
}
//Function declaration of clearAllTasks
function clearAllTasksFromLocalStorage() {
    localStorage.clear();
}
//Function declaration of filterTasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll('.collection-item').forEach(
        task => {
            const item = task.firstChild.textContent;
            if( item.toLowerCase().indexOf(text) !== -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
} 