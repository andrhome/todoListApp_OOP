class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.addTodo.bind(this));
    }

    addTodo(title) {
        console.log('Controller ' + title);
        //TODO: Call method from model
    }
}

export default Controller;