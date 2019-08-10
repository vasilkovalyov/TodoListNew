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
let notCompleteLIST = []; // array for not completed event items
let i = 0;


input.addEventListener('keyup', () => { event.keyCode == 13 ? create() : 0 })
addTodoItem.addEventListener('click', create);


todoWrapper.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');
    const dataType = e.target.getAttribute('data-type');

    const keyTodoItem = e.target.getAttribute('data-key');
    const eventObject = getTodoObjectById(keyTodoItem,LIST);

    switch (dataType) {
        case 'remove':
            eventObject.todoItemObject.trash = true;

            if(!eventObject.todoItemObject.complete){
                // get item with props trash = true and put to removedLIST
                removedLIST = LIST.filter((item) => item.todoItemObject.trash == true); 
            }else{
                const eventObjectInCompleteList = getTodoObjectById(keyTodoItem,completeLIST);
                completeLIST = removeFromArray(keyTodoItem,completeLIST);
                removedLIST.push(eventObjectInCompleteList);
            }

            notCompleteLIST = LIST.filter((item) => item.todoItemObject.trash == false);
            
            todoList.removeChild(item); // remove eventItem from DOM
            setCounter(notCompleteLIST); // counter for complete events

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
            completeLIST = LIST.filter((item) => {
                return item.todoItemObject.complete == true && item.todoItemObject.trash == false
            });
            // get item with props complete = false and put to removedLIST
            notCompleteLIST = LIST.filter((item) => {
                return item.todoItemObject.complete == false && item.todoItemObject.trash == false
            });

            setCounter(notCompleteLIST);

            break;

        default:

            break;
    }
})

function removeFromArray(id,array){
    for(let i = 0; i < array.length; i++){
        if(array[i].todoItemObject.id == id){
            array.splice(array[i],1);
        }
    }
    return array;
}

function getTodoObjectById(id, array){
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].todoItemObject.id == id) {
            return array[i];
        }
    }
}

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
    (items.length > 0) ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
}