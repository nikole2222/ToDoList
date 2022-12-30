// looking for elements on the page
const form = document.querySelector('#form'),
      taskInput = document.querySelector('#taskInput'),
      taskList = document.querySelector('#tasksList'),
      emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => renderTask(task));
}

checkEmptyList();

taskList.addEventListener('click', doneTask);

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);


function doneTask(e) {
    if (e.target.dataset.action !== 'done') return;

        const parentNode = e.target.closest('.list-group-item');
        
     
        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id)

        task.done = !task.done;

        saveToLocalStorage();

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')   
}

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);

    saveToLocalStorage();

    // css class
    renderTask(newTask);

    // clean field in input
    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return;

    const parentNode = e.target.closest('.list-group-item');

    // find out ID
    const id = parentNode.id;
    
    const index = tasks.findIndex(task => task.id === id);

   tasks.splice(index, 1);

   saveToLocalStorage();

    parentNode.remove();

    checkEmptyList();
} 

function checkEmptyList() {
    if (tasks.length == 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
        </li>`;


        taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } 

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    const cssCLass = task.done ? 'task-title task-title--done' : 'task-title';

    const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssCLass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;

    // add on the page
    taskList.insertAdjacentHTML("beforeend", taskHtml);
}