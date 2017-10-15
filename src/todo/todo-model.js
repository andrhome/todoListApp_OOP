import { EventEmiter, HttpService } from './todo-helper';

class Model extends EventEmiter{
    constructor() {
        super();

        this.todoItems = [];
        this.http = new HttpService();
    }

    getTodoItems() {
        this.http.getData('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                this.todoItems = JSON.parse(response);
                this.emit('createTodoList', this.todoItems);
            })
            .catch(
                error => {
                    console.log(error);
                    this.emit('createTodoList', error.code);
                }
            );
    }

    addTodo(todoItem) {
        this.http.addData('https://jsonplaceholder.typicode.com/todos', todoItem)
            .then( response => {
                let newTodo = JSON.parse(response);
                this.todoItems.push(newTodo);
                this.emit('createTodoList', this.todoItems);
            })
            .catch( error => console.log(error) );
    }
}

export default Model;