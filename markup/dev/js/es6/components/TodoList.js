import {TodoItem} from './TodoItem';

export class TodoList{
    constructor(){
        this.LIST = new Map();
        this.removedLIST = new Map();
        this.complateLIST = new Map();
        this.notComplateLIST = new Map();
        this.input = document.querySelector('.input-holder input[type="text"]');
        this.todoWrapper = document.querySelector('.main-todo-wrapper');
        this.todoList = document.querySelector('.todo-list');
        this.counter = 0;
    }

    get Counter(){
        return this.counter;
    }

    set Counter(value){
        this.counter = value;
    }

    createTodoEvent(){
        const counter = this.counter;
        const todoItemObject = new TodoItem(this.counter, this.input.value, false);
        this.input.value = '';
        this.todoList.insertAdjacentHTML("afterbegin", todoItemObject.renderTodoItem()); // add event in DOM events list
        this.LIST.set( counter, todoItemObject ); // add event to map array
        this.counter++;
        this.checkOnItem(); // visual check event
    }
    
    getObjectById(id, mapArray){
        for(let item of mapArray.entries()){
            if(item[0] == id){
                return mapArray.get(item[0]);
            }
        }
    }

    removeFormArrayById(id,mapArray){
        for(let key of mapArray.keys()){
            if(key == id){
                mapArray.delete(key)
            }
        }
    }

    movingThroughArraysById(id, oldArrayMap, newArrayMap){
        for(let item of oldArrayMap.entries()){
            let key = item[0];
            let object = item[1];
            if(key == id){
                newArrayMap.set(key,object);
            }
        }
    }

    removeAllComplateEvents(){
        for(let item of this.complateLIST.entries()){
            let key = item[0];
            let object = item[1];

            if(object.Complate){
                this.removedLIST.set(key,object);
                this.LIST.delete(key);
            }
        }

        this.complateLIST.clear();
        this.removeTodoListFromDom();
    }

    removeTodoListFromDom(){
        const todoItem = document.querySelectorAll('.todo-item.complate');
        for(let i = 0; i <= todoItem.length - 1; i++){
            let item = todoItem[i];
            this.todoList.removeChild(item);
        }
    }

    checkOnItem() {
        let items = document.querySelectorAll('.todo-item');
        (items.length > 0) ? this.todoWrapper.classList.add('show') : this.todoWrapper.classList.remove('show');
    }

    removeFromDomList(object){
        this.todoList.removeChild(object);
    }

    getCouterLatestEvents(){
        let latestArray = new Map();
        for(let item of this.LIST.entries()){
            let key = item[0];
            let object = item[1];
            if(!object.Complate){
                latestArray.set(key, object);
            }
        }
        return latestArray.size;
    }
}