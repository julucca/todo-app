const $todoList = document.querySelector('[data-list]');
const $addForm = document.querySelector('[data-form]');
const $addInput = document.querySelector('[data-input]');

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
                <button class="btn btn--checkbox"></button>
                <p class="flex-grow-1 mb-0">${name}</p>
                <button class="btn btn--del">
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