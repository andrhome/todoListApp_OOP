export function renderTodoList(todoItems, callback) {

    let tableListTbody = document.querySelector('#tableList tbody'),
        totalTodo = document.getElementById('totalTodo');

    if(todoItems && typeof todoItems !== 'number') {

        let todoItemsHtml = '';

        totalTodo.innerText = todoItems.length;

        let addClassCompleted = function(todo) {
            if (todo.completed) return 'completed';
        };

        let checkOnChecked = function(todo) {
            if (todo.completed) return 'checked';
        };

        tableListTbody.innerHTML = '';

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

        tableListTbody.insertAdjacentHTML('beforeEnd', todoItemsHtml);

    } else{

        let errorMessage = '<tr>' +
                                '<td colspan="4">' +
                                    '<h2 class="todo-list-error">' +
                                        '<div>No todo items!</div>' +
                                        '<div class="server-error">Server error ' + todoItems + '</div>' +
                                    '</h2>' +
                                '</td>' +
                            '</tr>';

        tableListTbody.insertAdjacentHTML('beforeEnd', errorMessage);
    }
}