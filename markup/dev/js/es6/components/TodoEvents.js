import {TodoList} from './TodoList';

export class TodoEvents {
    constructor(){
        this.input = document.querySelector('.input-holder input[type="text"]');
    }

    create(){
        if (this.input.value === '') {
            alert('input is empty');
        } else {
            const todoItemObject = new TodoItem(this.counterTodo, this.input.value, false); // create event object
            this.input.value = '';
            todoList.appendChild(todoItemObject.renderTodoItem()); // add event in DOM events list
            LIST.push({ i, todoItemObject });
            
            setCounter(LIST); // counter for todo items who not complete or removed
            checkOnItem(); // visual check event
            
            this.counterTodo++;
        }
    }
}