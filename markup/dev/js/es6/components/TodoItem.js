export class TodoItem {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.complete = false;
        this.trash = false;
    }


    renderTodoItem = () => {
        const li = document.createElement('li');
        li.setAttribute('id', this.id);
        li.classList.add('todo-item');
        const todoContent = `
            <label>
                <input type="checkbox">
                <span class="todo-item-check" complete-item='${this.id}' data-type='complate'></span>
            </label>
            <span class="todo-item-text">${this.text}</span>
            <span class="todo-item-remove" remove-item='${this.id}' data-type='remove'></span>
        `;
        li.insertAdjacentHTML('afterbegin', todoContent);

        return li;
    }

}

