import { TodoItem } from './components/TodoItem';

const addTodoItem = document.querySelector('.input-holder .btn');

const completeTodoItem = document.querySelectorAll('.todo-item-check');
const counterLeftTodoItems = document.querySelector('.left-items .counter');
const removeAllCompleteTodoItems = document.querySelector('.clear-all');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('.input-holder input[type="text"]');
const todoWrapper = document.querySelector('.main-todo-wrapper');

let LIST = [];
let i = 0;

addTodoItem.addEventListener('click', create);
todoWrapper.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');

    switch (e.target.getAttribute('data-type')) {
        case 'remove':
            todoList.removeChild(item);
            counterAllItems()
            break;
        case 'complate':
            item.classList.toggle('complate');
            counterAllItems()
            break;
        default:
            break;
    }

})


function create() {
    const todoItemObject = new TodoItem(i, input.value, false, false);
    todoList.appendChild(todoItemObject.renderTodoItem());

    LIST.push(todoItemObject);
    counterAllItems();

    checkOnItem();
    i++;
}

function counterAllItems() {
    counterLeftTodoItems.innerText = LIST.length;
}


function checkOnItem() {
    let items = document.querySelectorAll('.todo-item');
    if (items) {
        todoWrapper.classList.add('show');
    } else {
        todoWrapper.classList.remove('show');
    }
}