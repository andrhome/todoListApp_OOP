import { EventEmiter } from './todo-helper';

class Model extends EventEmiter{
    constructor() {
        super();

        this.todoItems = [];
    }

    httpService(type, url) {
        return new Promise(function(resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url, true);

            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else{
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error'));
            };

            xhr.send();
        });
    }

    getTodoItems() {
        this.httpService('GET', 'https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                this.todoItems = response;
                this.emit('createTodoList', this.todoItems);
            })
            .catch(error => console.log(error));
    }
}

export default Model;