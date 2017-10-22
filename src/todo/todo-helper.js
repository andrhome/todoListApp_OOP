class EventEmiter {
    constructor() {
        this.events = [];
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg));
        }
    }
}

function httpService(type, url, body) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        document.body.classList.add('load');

        xhr.onload = function () {
            if (this.status === 200 || this.status === 201) {
                resolve(this.response);
                document.body.classList.remove('load');
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
                document.body.classList.remove('load');
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network error'));
        };

        xhr.send(JSON.stringify(body));
    });
}

export { EventEmiter, httpService }