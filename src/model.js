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

    // Get data from JSONPlaceholder (https://jsonplaceholder.typicode.com)
    getData(data) {
        console.log('Model data ', data);
    }
}

export default Model;