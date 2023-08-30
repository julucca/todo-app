const $todoList = document.querySelector('[data-list]');
const $addForm = document.querySelector('[data-form]');
const $addInput = document.querySelector('[data-input]');
const $filterTasksBtns = document.querySelectorAll('[data-filters] button');

const todoList = getStoredList();

// [Add tasks]
function getStoredList() {
    return JSON.parse(localStorage.getItem('todoList')) || [];
}

function setStoredList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTasks (todoList) {
    todoList.forEach((task) => {
        let isCompleted = task.isCompleted;
        let name = task.name;
        let taskId = task.id;
        let content = `
            <li class="d-flex align-items-center ${isCompleted ? 'checked' : '' }">
                <button class="btn btn--checkbox" onclick='taskIsCompleted(${taskId})' data-id='${taskId}'></button>
                <p class="flex-grow-1 mb-0" onclick='taskIsCompleted(${taskId})' data-id='${taskId}'>${name}</p>
                <button class="btn btn--del" onclick='deleteTask(${taskId})' data-id='${taskId}'>
                    <img src="./assets/img/icon-cross.svg" alt="Ícone de deletar a tarefa">
                </button>
            </li>
        `;
        $todoList.innerHTML += content;
    });
};

function addTask(taskName) {
    let listLength = todoList.length;
    let taskId = 1;
    if (listLength > 0) {
        let biggerTaskId = todoList.filter((task) => {
            return task.id >= listLength;
        });
        taskId = biggerTaskId[0].id + 1;
    }
    todoList.unshift({ id: taskId, name: taskName, isCompleted: false });
}

window.addEventListener('load', () => {
    getStoredList();
    renderTasks(todoList);
})

$addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    $todoList.innerHTML = '';
    addTask($addInput.value);
    setStoredList();
    renderTasks(todoList);
    $addInput.value = '';
});

// [Filter tasks]
function activeTasks() {
    $todoList.innerHTML = '';
    const activeTasksArr = todoList.filter((task) => {
      return task.isCompleted === false;
    });
    renderTasks(activeTasksArr);
};

function completedTasks() {
    $todoList.innerHTML = ''
    const completedTasksArr = todoList.filter((task) => {
        return task.isCompleted === true
    }); 
    renderTasks(completedTasksArr);
}

function switchRederedTasks(taskStatus) {
    switch (taskStatus) {
        case 'active':
            activeTasks();
            activeBtn(taskStatus);
            break;
        case 'completed':
            completedTasks();
            activeBtn(taskStatus);
            break;
        default:
            $todoList.innerHTML = '';
            renderTasks(todoList);
            activeBtn(taskStatus);
            break;
    }
}

$filterTasksBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        let taskStatus = btn.dataset.name;
        switchRederedTasks(taskStatus)
    });
});

const activeBtn = (dataName) => {
    for (const btn of $filterTasksBtns) {
        btn.classList.remove('btn--active');
        if (btn.dataset.name === dataName) {
            btn.classList.add('btn--active');
        }
    }
}

// [Completed/Check task]
function taskIsCompleted(taskId) {
    $todoList.innerHTML = '';
    let taskStatus = 'all';
    for (const activeBtn of $filterTasksBtns) {
        if (activeBtn.classList.contains('btn--active')) {
            taskStatus = activeBtn.dataset.name;
        }
    }

    todoList.forEach((task) => {
        if (task.id === taskId) {
            let isComplted = task.isCompleted === true ? false : true;
            task.isCompleted = isComplted;
        }
    });

    switchRederedTasks(taskStatus);
    setStoredList();
}

// [Delete task]
function deleteTask(taskId) {
    $todoList.innerHTML = "";
    let taskStatus = "all";
    for (const activeBtn of $filterTasksBtns) {
      if (activeBtn.classList.contains("btn-active")) {
        taskStatus = activeBtn.dataset.name;
      }
    }
    todoList.forEach((task, index) => {
      if (task.id === taskId) {
        todoList.splice(index, 1);
      }
    });
    switchRederedTasks(taskStatus);
    setStoredList();
};