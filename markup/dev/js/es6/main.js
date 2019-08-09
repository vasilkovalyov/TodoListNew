import { TodoItem } from './components/TodoItem';

const addTodoItem = document.querySelector('.input-holder .btn');

const completeTodoItem = document.querySelectorAll('.todo-item-check');
const counterLeftTodoItems = document.querySelector('.left-items .counter');
const removeAllCompleteTodoItems = document.querySelector('.clear-all');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('.input-holder input[type="text"]');
const todoWrapper = document.querySelector('.main-todo-wrapper');
const filterList = document.querySelector('.tab-list-links');

let LIST = []; // array for event items
let leftLIST = []; // array for event who else not complete
let removedLIST = []; // array for removed event items
let completeLIST = []; // array for completed event items
let i = 0;


input.addEventListener('keyup', () => { event.keyCode == 13 ? create() : 0 })
addTodoItem.addEventListener('click', create);


todoWrapper.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');
    const dataType = e.target.getAttribute('data-type');
    const dataIdRemove = e.target.getAttribute('remove-item');
    const dataIdCheck = e.target.getAttribute('complete-item');

    switch (dataType) {
        case 'remove':
            trashEventFromArray(dataIdRemove); // change flag on props trash
            removedLIST = LIST.filter((item) => item.todoItemObject.trash == true);
            LIST = LIST.filter((item) => item.todoItemObject.trash == false);
            todoList.removeChild(item); // remove eventItem from DOM
            setCounter(LIST); // counter for trash
            break;
        case 'complate':
            item.classList.toggle('complate');
            checkEventFromArray(dataIdCheck, item.classList.contains('complate') ? true : false);
            completeLIST = LIST.filter((item) => item.todoItemObject.complete == true);
            setCounter(LIST); // counter for events
            break;
        default:
            break;
    }
})


filterList.addEventListener('click', (e) => {
    let dataType = e.target.getAttribute('data-active');

});


function create() {
    if (input.value === '') {
        alert('input is empty');
    } else {
        const todoItemObject = new TodoItem(i, input.value, false); // create event object
        input.value = '';
        todoList.appendChild(todoItemObject.renderTodoItem()); // add event in DOM events list
        LIST.push({ i, todoItemObject });
        setCounter(LIST) // counter for events
        checkOnItem(); // visual check event
        i++;
    }
}

function setCounter(array) {
    counterLeftTodoItems.innerText = array.length;
}

function checkOnItem() {
    let items = document.querySelectorAll('.todo-item');
    (items) ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
}

function checkEventFromArray(id, flag) {
    for (let i = 0; i <= LIST.length - 1; i++) {
        if (LIST[i].todoItemObject.id == id) {
            flag ? LIST[i].todoItemObject.complete = flag : LIST[i].todoItemObject.complete = flag
        }
    }
}

function trashEventFromArray(id) {
    for (let i = 0; i <= LIST.length - 1; i++) {
        if (LIST[i].todoItemObject.id == id) {
            LIST[i].todoItemObject.trash = true;
        }
    }
}

function removeEventFromArray(id) {
    for (let i = 0; i <= LIST.length - 1; i++) {
        if (LIST[i].todoItemObject.id = id) {
            LIST.splice(LIST[i], 1);
        }
    }
}

// function removeEventFromArray(id,toArray) {
//     for (let i = 0; i <= LIST.length - 1; i++) {
//         if (LIST[i].todoItemObject.id = id) {

//             toArray.push(LIST[i]);
//             break;
//         }
//     }
// }
