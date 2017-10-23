class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.getTodoItems();

        model.on('createTodoList', this.createTodoList.bind(this));
        view.on('add', this.addTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
    }

    createTodoList(todoItemsData) {
        this.view.renderTodoList(todoItemsData);
    }

    addTodo(title) {
        let todoItem = {
            userId: 10,
            title: title,
            completed: false
        };

        this.model.addTodo(todoItem);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
    }

    editTodo( {id, title} ) {
        this.model.editTodo( {id, title} );
    }

    toggleTodo(id) {
        this.model.toggleTodo(id);
    }
}

export default Controller;