const baseUrl = 'https://jsonplaceholder.typicode.com';

class Model{
    constructor(state = []) {
        this.state = state;

        this.getDataBtn = document.getElementById('getDataBtn');
        this.getDataBtn.addEventListener('click', this.getData.bind(this));
    };

    getItem(id) {
        return this.state.find(item => item.id == id);
    }

    addItem(item) {
        this.state.push(item);
        return item;
    }

    updateItem(id, data) {
        const item = this.getItem(id);
        Object.keys(data).forEach(prop => item[prop] = data[prop]);

        return item;
    }

    removeItem(id) {
        const index = this.state.findIndex(item => item.id == id);

        if(index > -1) {
            this.state.splice(index, 1);
        }
    }

    httpRequest(url) {
        return new Promise( function(resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });

    }

    getData() {
        this.httpRequest(baseUrl + '/posts').then(response => {
            console.log(response);
        });
    }
}

export default Model;