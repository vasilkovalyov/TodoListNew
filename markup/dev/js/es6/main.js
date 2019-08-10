import { TodoItem } from './components/TodoItem';
import {TodoList} from './components/TodoList';
import {TodoEvents} from './components/TodoEvents';

const inputHolder = document.querySelector('.input-holder');
const addTodoItem = document.querySelector('.input-holder .btn');

const completeTodoItem = document.querySelectorAll('.todo-item-check');
const counterLeftTodoItems = document.querySelector('.left-items .counter');
const removeAllCompleteTodoItems = document.querySelector('.clear-all');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('.input-holder input[type="text"]');
const todoWrapper = document.querySelector('.main-todo-wrapper');
const filterList = document.querySelector('.tab-list-links');


const todoListObject = new TodoList(); // object for all array todo items
const todoEventObject = new TodoEvents(); // object for event todo items

let counterTodoEvent = 0;


input.addEventListener('keyup', (e) => e.keyCode == 13 ? create() : -1);
addTodoItem.addEventListener('click', () => create());

function create(){
    if (input.value === '') {
        alert('input is empty');
    } else {
        const todoItemObject = new TodoItem(counterTodoEvent, input.value, false); // create event object
        input.value = '';
        todoList.appendChild(todoItemObject.renderTodoItem()); // add event in DOM events list
        todoListObject.LIST.push({ counterTodoEvent, todoItemObject });
        setCounter(todoListObject.LIST) // counter for remaining events
        checkOnItem(); // visual check event
        counterTodoEvent++;
    }
}

todoWrapper.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');
    const dataType = e.target.getAttribute('data-type');
    const keyTodoItem = e.target.getAttribute('data-key');

    const eventObject = todoListObject.getTodoObjectById(keyTodoItem, todoListObject.LIST);

    switch(dataType){
        case 'remove':
            eventObject.todoItemObject.trash = true;

            console.log(todoListObject);
            if(!eventObject.todoItemObject.complete){
                todoListObject.removedLIST = todoListObject.LIST.filter((item) => item.todoItemObject.trash == true); 
            }else{
                const todoEventInCompleteList = todoListObject.getTodoObjectById(keyTodoItem,todoListObject.completeLIST);
                todoListObject.completeLIST = todoListObject.removeFromArray(keyTodoItem,todoListObject.completeLIST);
                todoListObject.removedLIST.push(todoEventInCompleteList);
            }

            todoListObject.notCompleteLIST = todoListObject.LIST.filter((item) => item.todoItemObject.trash == false);
            todoList.removeChild(item); 
            setCounter(todoListObject.LIST); // counter for remaining events
            checkOnItem();

            break;
        case 'complate':
                if(eventObject.todoItemObject.complete){
                    item.classList.remove('complate');
                    eventObject.todoItemObject.complete = false;
                }else{
                    item.classList.add('complate');
                    eventObject.todoItemObject.complete = true;
                }
                
                // get item with props complete = true and put to removedLIST
                todoListObject.completeLIST = todoListObject.LIST.filter((item) => {
                    return item.todoItemObject.complete == true && item.todoItemObject.trash == false
                });
                // get item with props complete = false and put to removedLIST
                todoListObject.notCompleteLIST = todoListObject.LIST.filter((item) => {
                    return item.todoItemObject.complete == false && item.todoItemObject.trash == false
                });
    
                setCounter(todoListObject.LIST); // counter for remaining events
            break;
        default:
            break;
    }
})

function setCounter(array) {
    const latestTodoItems = array.filter((item) => {
        return item.todoItemObject.complete == false && item.todoItemObject.trash == false;
    });
    counterLeftTodoItems.innerText = latestTodoItems.length;
}

function checkOnItem() {
    let items = document.querySelectorAll('.todo-item');
    (items.length > 0) ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
}