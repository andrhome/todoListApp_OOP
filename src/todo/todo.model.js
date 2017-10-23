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

    editTodo( {id, title} ) {
        httpService('PUT', BASE_URL + id, {title: title})
            .then( response => {
                let data = JSON.parse(response),
                    index = this.getIndexItem(data.id);

                if (index > -1) {
                    this.todoItems[index].title = data.title;
                    this.emit('createTodoList', this.todoItems);
                }
            })
            .catch( error => console.log(error) );
    }

    toggleTodo(id) {
        let index = this.getIndexItem(id),
            completed;

        if (index > -1) {
            this.todoItems[index].completed ? completed = false : completed = true;
        }

        httpService('PUT', BASE_URL + id, {completed: completed})
            .then( (response) => {
                let data = JSON.parse(response),
                    index = this.getIndexItem(data.id);

                if (index > -1) {
                    this.todoItems[index].completed = data.completed;
                    this.emit('createTodoList', this.todoItems);
                }
            })
            .catch( error => console.log(error) );
    }
}

export default Model;