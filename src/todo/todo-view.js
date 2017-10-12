import { EventEmiter } from './todo-helper';

class View extends EventEmiter {
    constructor() {
        super();

        this.todoForm = document.getElementById('todoForm');
        this.textField = document.getElementById('textField');
        this.addTodoBtn = document.getElementById('addTodoBtn');

        this.todoForm.addEventListener('submit', this.hadleAdd.bind(this));
    }

    hadleAdd(e) {
        e.preventDefault();

        let value = this.textField.value;
        this.emit('add', value);
    }
}

export default View;