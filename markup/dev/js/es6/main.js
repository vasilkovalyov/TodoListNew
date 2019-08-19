import { TodoItem } from './components/TodoItem';
import {TodoList} from './components/TodoList';
import {TodoEvents} from './components/TodoEvents';

const inputHolder = document.querySelector('.input-holder');
const addTodoItem = document.querySelector('.input-holder .btn');
const counterLeftTodoItems = document.querySelector('.left-items .counter');
const removeAllCompleteTodoItems = document.querySelector('.clear-all');
const input = document.querySelector('.input-holder input[type="text"]');
const filterList = document.querySelector('.tab-list-links');
const todoList = document.querySelector('.todo-list');


const todoListObject = new TodoList(); // object for all array todo items
const todoEventObject = new TodoEvents(); // object for event todo items


input.addEventListener('keyup', (e) => e.keyCode == 13 ? create() : -1);
addTodoItem.addEventListener('click', () => create());

todoList.addEventListener('click', function(e){
    const type = e.target.getAttribute('data-type');
    const target = e.target.closest('li.todo-item');

    switch(type){
        case 'complate':
            todoListObject.complateEvent(target);
            break;
        case 'remove':
            todoListObject.removeEvent(target);
            break;
        default:
            break;
    }
});

function create(){
    !input.value ? alert('input is empty') : todoListObject.createTodoEvent();
};

removeAllCompleteTodoItems.addEventListener('click', () => {
    todoListObject.removeAllComplateEvents();
})

// function remove(target){
//     const id = target.getAttribute('id');
//     const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
//     todoObject.Trash = true;

//     if(todoObject.Complate == true){
//         todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.removedLIST);
//         todoListObject.removeFormArrayById(id, todoListObject.complateLIST);
//     }else{
//         todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.removedLIST);
//     }

//     todoListObject.removeFormArrayById(id, todoListObject.LIST);
//     counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
//     todoListObject.removeFromDomList(target);
//     todoListObject.checkOnItem();
// }

// function complate(target){
//     const id = target.getAttribute('id');
//     const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);

//     if(todoObject.Complate){
//         todoObject.Complate = false;
//         todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.LIST);
//         target.classList.remove('complate');
//     }else{
//         todoObject.Complate = true;
//         todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.complateLIST);
//         target.classList.add('complate');
//     }

//     counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
// }

function filterTodoList(){
    filterList.addEventListener('click', (e) => {
        const filterItem = e.target.getAttribute('data-active');
        switch(filterItem){
            case 'all':
                todoListObject.filterEventsByType(todoListObject.LIST);
                break;
            case 'active':
                todoListObject.filterEventsByType(todoListObject.notComplateLIST);
                break;
            case 'complated':
                todoListObject.filterEventsByType(todoListObject.complateLIST);
                break;
        }
    });
}

filterTodoList();