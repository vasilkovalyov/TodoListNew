import {TodoItem} from './TodoItem';

export class TodoList{
    constructor(){
        this.LIST = [];
        this.removedLIST = [];
        this.completeLIST = [];
        this.notCompleteLIST = [];
    }

    getTodoObjectById(id, array){
        for (let i = 0; i <= array.length - 1; i++) {
            if (array[i].todoItemObject.id == id) {
                return array[i];
            }
        }
    }

    removeFromArray(id,array){
        for(let i = 0; i < array.length; i++){
            if(array[i].todoItemObject.id == id){
                array.splice(array[i],1);
            }
        }
        return array;
    }
    
}