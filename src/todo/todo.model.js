import { EventEmiter, httpService } from './todo-helper';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';

class Model extends EventEmiter{
    constructor() {
        super();

        this.todoItems = [];
    }

    getIndexItem(id) {
        return this.todoItems.findIndex( item => {
            return item.id === parseInt(id);
        });
    }

    getTodoItems() {
        httpService('GET', BASE_URL)
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
        httpService('POST', BASE_URL, todoItem)
            .then( response => {
                let newTodo = JSON.parse(response);
                this.todoItems.splice(0, 0, newTodo);
                this.emit('createTodoList', this.todoItems);
            })
            .catch( error => console.log(error) );
    }

    removeTodo(id) {
        httpService('DELETE', BASE_URL + id)
            .then( () => {
                let index = this.getIndexItem(id);

                if (index > -1) {
                    this.todoItems.splice(index, 1);
                    this.emit('createTodoList', this.todoItems);
                }
            })
            .catch( error => console.log(error) );
    }

    toggleTodoItem(id) {
        httpService('PUT', BASE_URL + id)
            .then( () => {
                let index = this.getIndexItem(id);

                if (index > -1) {
                    if ( this.todoItems[index].completed ) {
                        this.todoItems[index].completed = false;
                    } else{
                        this.todoItems[index].completed = true;
                    }

                    this.emit('createTodoList', this.todoItems);
                }
            })
            .catch( error => console.log(error) );
    }
}

export default Model;