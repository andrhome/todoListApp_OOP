import Model from './todo.model';
import View from './todo.view';
import Controller from './todo.controller';

const model = new Model();
const view = new View();
const controller = new Controller(model, view);