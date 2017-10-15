
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.getTodoItems();

        model.on('createTodoList', this.createTodoList.bind(this));
        view.on('add', this.addTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));
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
        console.log('id ', id);
    }
}

export default Controller;