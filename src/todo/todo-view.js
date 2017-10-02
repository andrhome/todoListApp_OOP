class View{
    constructor() {
        this.todoForm = document.getElementById('todoForm');
        this.textField = document.getElementById('textField');
        this.addTodoBtn = document.getElementById('addTodoBtn');

        this.todoForm.addEventListener('submit', this.hadleAdd.bind(this));
    }

    hadleAdd(ev) {
        ev.preventDefault();
        console.log(100);
    }
}

export default View;