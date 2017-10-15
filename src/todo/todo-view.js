import { EventEmiter } from './todo-helper';
import { renderTodoList } from './render-todolist';

class View extends EventEmiter {
    constructor() {
        super();

        this.todoForm = document.getElementById('todoForm');
        this.tableList = document.getElementById('tableList');
        this.textField = document.getElementById('textField');

        this.renderTodoList = renderTodoList;

        this.todoForm.addEventListener('submit', this.hadleAdd.bind(this));
        this.tableList.addEventListener('click', this.eventsListeners.bind(this))
    }

    eventsListeners({target}) {
        if (target.tagName === 'BUTTON' && target.classList.contains('delete')) this.handleRemove({target});
    }

    hadleAdd(e) {
        e.preventDefault();

        let value = this.textField.value;
        this.emit('add', value);
        this.textField.value = '';
    }

    handleRemove( {target} ) {
        let listItem = target.parentNode.parentNode,
            id = listItem.getAttribute('data-id');

        this.emit('remove', id);
    }
}

export default View;