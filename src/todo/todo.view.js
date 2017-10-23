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

    eventsListeners( {target} ) {
        if (target.tagName === 'BUTTON' && target.classList.contains('delete')) this.handleRemove( {target} );
        if (target.tagName === 'BUTTON' && target.classList.contains('edit')) this.handleEdit( {target} );
        if (target.tagName === 'LABEL' && target.classList.contains('label-checkbox')) this.handleToggle( {target} );
    }

    getItemId(target) {
        let listItem = target.parentNode.parentNode;
        return listItem.getAttribute('data-id');
    }

    hadleAdd(e) {
        e.preventDefault();

        let value = this.textField.value;
        this.emit('add', value);
        this.textField.value = '';
    }

    handleRemove( {target} ) {
        this.emit('remove', this.getItemId(target));
    }

    handleEdit( {target} ) {
        let id = this.getItemId(target),
            parent = target.parentNode.parentNode,
            value = parent.querySelector('.todo-name').innerText,
            textfield = parent.querySelector('.textfield'),
            title = '';

        if ( parent.classList.contains('editing') ) {
            parent.classList.remove('editing');
            target.innerText = 'Edit';

            title = textfield.value;
            this.emit('edit', {id, title});
        } else{
            parent.classList.add('editing');
            textfield.value = value;
            target.innerText = 'Save';
        }
    }

    handleToggle( {target} ) {
        this.emit('toggle',this.getItemId(target));
    }
}

export default View;