import { EventEmiter } from './todo-helper';

class View extends EventEmiter {
    constructor() {
        super();

        this.tableListTbody = document.querySelector('#tableList tbody');
        this.todoForm = document.getElementById('todoForm');
        this.textField = document.getElementById('textField');
        this.addTodoBtn = document.getElementById('addTodoBtn');

        this.todoForm.addEventListener('submit', this.hadleAdd.bind(this));
    }

    renderTodoList(todoItemsData) {

        if(todoItemsData !== null && typeof todoItemsData !== 'number') {

            let todoItems = JSON.parse(todoItemsData),
                todoItemsHtml = '';

            let addClassCompleted = function(todo) {
                if (todo.completed) return 'completed';
            };

            let checkOnChecked = function(todo) {
                if (todo.completed) return 'checked';
            };

            todoItems.forEach(function(todo, i) {
                todoItemsHtml += '<tr data-id="' + todo.id + '" class="todo-item ' + addClassCompleted(todo) + '">' +
                                    '<td>' + (i+1) + '</td>' +
                                    '<td>' +
                                        '<input id="checkbox-' + (i+1) + '" class="checkbox" type="checkbox" ' + checkOnChecked(todo) + '>' +
                                        '<label for="checkbox-' + (i+1) + '" class="label-checkbox"></label>' +
                                    '</td>' +
                                    '<td class="todo-name-col">' +
                                        '<span class="todo-name">' + todo.title + '</span>' +
                                        '<input type="text" class="textfield">' +
                                    '</td>' +
                                    '<td>' +
                                        '<button class="btn edit" type="button">Edit</button>' +
                                        '<button class="btn warning delete" type="button">Delete</button>' +
                                    '</td>' +
                                '</tr>';
            });

            this.tableListTbody.insertAdjacentHTML('beforeEnd', todoItemsHtml);
        } else{
            let errorMessage = '<tr>' +
                            '<td colspan="4">' +
                                '<h2 class="todo-list-error">' +
                                '<div>No todo items!</div>' +
                                '<div class="server-error">Server error ' + todoItemsData + '</div>' +
                                '</h2>' +
                            '</td>' +
                        '</tr>';
            this.tableListTbody.insertAdjacentHTML('beforeEnd', errorMessage);
        }
    }

    hadleAdd(e) {
        e.preventDefault();

        let value = this.textField.value;
        this.emit('add', value);
    }
}

export default View;