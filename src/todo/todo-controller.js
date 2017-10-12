class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.getTodoItems();

        model.on('createTodoList', this.createTodoList.bind(this));
        view.on('add', this.addTodo.bind(this));
    }

    createTodoList(todoItems) {
        console.log(todoItems);
    }

    addTodo(title) {
        console.log(title);
        //TODO: Call method from model
    }
}

export default Controller;