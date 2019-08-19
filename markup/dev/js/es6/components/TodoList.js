import {TodoItem} from './TodoItem';

export class TodoList{
    constructor(){
        this.LIST = new Map();
        this.removedLIST = new Map();
        this.complateLIST = new Map();
        this.notComplateLIST = new Map();
        this.todoList = document.querySelector('.todo-list');
        this.counterLeftTodoItems = document.querySelector('.left-items .counter');
        this.counter = 0;
    }

    createTodoEvent(inputValue){
        const counter = this.counter;
        const todoItemObject = new TodoItem(this.counter, inputValue, false);
        this.todoList.insertAdjacentHTML("afterbegin", todoItemObject.renderTodoItem());
        this.LIST.set( counter, todoItemObject );
        this.notComplateLIST.set( counter, todoItemObject );
        this.counter++;
        this.checkOnItem();
        this.setCounterEvents(this.getCouterLatestEvents());
    }

    removeEvent(target){
        const id = target.getAttribute('id');
        const object = this.getObjectById(id,this.LIST);
        object.Trash = true;

        if(object.Complate){
            this.movingThroughArraysById(id, this.complateLIST, this.removedLIST);
            this.removeFormArrayById(id, this.complateLIST);
        }else{
            this.movingThroughArraysById(id, this.LIST, this.removedLIST);
        }

        this.removeFormArrayById(id, this.LIST);
        this.removeFormArrayById(id, this.notComplateLIST);
        this.setCounterEvents(this.getCouterLatestEvents());
        this.removeFromDomList(target);
        this.checkOnItem();
    }

    complateEvent(target){
        const id = target.getAttribute('id');
        const object = this.getObjectById(id,this.LIST);

        if(object.Complate){
            object.Complate = false;
            this.movingThroughArraysById(id, this.complateLIST, this.notComplateLIST);
            this.removeFormArrayById(id, this.complateLIST);
            target.classList.remove('complate');

        }else{
            object.Complate = true;
            this.movingThroughArraysById(id, this.LIST, this.complateLIST);
            this.removeFormArrayById(id, this.notComplateLIST);
            target.classList.add('complate');
        }

        this.setCounterEvents(this.getCouterLatestEvents());
    }

    getObjectById(id, mapArray){
        for(let item of mapArray.entries()){
            if(item[0] == id){
                return mapArray.get(item[0]);
            }
        }
    }

    removeFormArrayById(id, mapArray){
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
        const todoWrapper = document.querySelector('.main-todo-wrapper');
        
        let items = document.querySelectorAll('.todo-item');
        (items.length > 0) ? todoWrapper.classList.add('show') : todoWrapper.classList.remove('show');
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

    filterEventsByType(mapArray){
        this.removeAllChildren();
        for(let item of mapArray.entries()){
            this.todoList.insertAdjacentHTML("afterbegin", item[1].renderTodoItem());
            const check = document.querySelector('.todo-item');
            if(item[1].Complate){
                check.classList.add('complate');
            }
        }
    }

    removeAllChildren(){
        while (this.todoList.firstChild) {
            this.todoList.removeChild( this.todoList.firstChild);
        }
    }

    setCounterEvents(counter){
        this.counterLeftTodoItems.innerHTML = counter;
    }
}