import { TodoItem } from './components/TodoItem';
import {TodoList} from './components/TodoList';
import {TodoEvents} from './components/TodoEvents';

const addTodoItem = document.querySelector('.input-holder .btn');
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
    !input.value ? alert('input is empty') : todoListObject.createTodoEvent(input.value);

    input.value = '';
};

removeAllCompleteTodoItems.addEventListener('click', () => {
    todoListObject.removeAllComplateEvents();
})

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