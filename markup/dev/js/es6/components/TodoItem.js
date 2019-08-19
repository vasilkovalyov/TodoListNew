export class TodoItem {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.complate = false;
        this.trash = false;
    }

    get Id(){
        return this.id;
    }

    get Complate() {
        return this.complate;
    }

    set Complate(value) {
        this.complate = value;
    }

    get Trash(){
        return this.trash;
    }

    set Trash(value){
        this.trash = value;
    }

    renderTodoItem = () => {
        const li = `
            <li id=${this.id} class='todo-item'>
                <span class="todo-item-check" data-key='${this.id}' data-type='complate' complate-btn></span>
                <span class="todo-item-text">${this.text}</span>
                <span class="todo-item-remove" data-key='${this.id}' data-type='remove' remove-btn></span>
            </li>
        `;

        return li;
    }
}

