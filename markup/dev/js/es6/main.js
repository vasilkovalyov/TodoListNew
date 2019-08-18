import { TodoItem } from './components/TodoItem';
import {TodoList} from './components/TodoList';
import {TodoEvents} from './components/TodoEvents';

const inputHolder = document.querySelector('.input-holder');
const addTodoItem = document.querySelector('.input-holder .btn');
const counterLeftTodoItems = document.querySelector('.left-items .counter');
const removeAllCompleteTodoItems = document.querySelector('.clear-all');
const input = document.querySelector('.input-holder input[type="text"]');
const filterList = document.querySelector('.tab-list-links');


const todoListObject = new TodoList(); // object for all array todo items
const todoEventObject = new TodoEvents(); // object for event todo items


input.addEventListener('keyup', (e) => e.keyCode == 13 ? create() : -1);
addTodoItem.addEventListener('click', () => create());

removeAllCompleteTodoItems.addEventListener('click', () => {
    todoListObject.removeAllComplateEvents();
})

function create(){
    if(input.value === ''){
        alert('input is empty');
    }else{
        todoListObject.createTodoEvent();
        const btnRemove = document.querySelector('.todo-item-remove');
        const btnComplate = document.querySelector('.todo-item-check');
        counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();

        btnRemove.addEventListener('click', function() {
            remove(this.closest('li.todo-item'));
        });

        btnComplate.addEventListener('click', function() {
            complate(this.closest('li.todo-item'));
        });
    }
}

function remove(target){
    const id = target.getAttribute('id');
    const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);
    todoObject.Trash = true;

    if(todoObject.Complate == true){
        todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.removedLIST);
        todoListObject.removeFormArrayById(id, todoListObject.complateLIST);
    }else{
        todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.removedLIST);
    }

    todoListObject.removeFormArrayById(id, todoListObject.LIST);
    counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
    todoListObject.removeFromDomList(target);
    todoListObject.checkOnItem();
}

function complate(target){
    const id = target.getAttribute('id');
    const todoObject = todoListObject.getObjectById(id, todoListObject.LIST);

    if(todoObject.Complate){
        todoObject.Complate = false;
        todoListObject.movingThroughArraysById(id, todoListObject.complateLIST, todoListObject.LIST);
        target.classList.remove('complate');
    }else{
        todoObject.Complate = true;
        todoListObject.movingThroughArraysById(id, todoListObject.LIST, todoListObject.complateLIST);
        target.classList.add('complate');
    }

    counterLeftTodoItems.innerText = todoListObject.getCouterLatestEvents();
}