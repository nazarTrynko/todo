import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'vm'
  }
};

AppCtrl.$inject = ['firebase', '$firebaseArray'];

function AppCtrl($scope, $firebaseArray) {
  const vm = this;
  const ref = firebase.database().ref();

  vm.appName = "Todo App";
  vm.todoTitle = '';
  vm.inputLength = 40;
  vm.todos = $firebaseArray(ref.child('todos'));

  vm.addTodo = addTodo;
  vm.removeTodo = removeTodo;
  vm.toggleCompleted = toggleCompleted;
  vm.removeAllCompleted = removeAllCompleted;
  vm.showRemoveButton = showRemoveButton;

  function addTodo() {
    vm.todos.$add({ name: vm.todoTitle, completed: false }).then(() => {});
    vm.todoTitle = '';
  }

  function removeTodo(item) {
    vm.todos.$remove(item)
  }

  function toggleCompleted(index) {
    vm.todos[index].completed = !vm.todos[index].completed;
    vm.todos.$save(index);
  }

  function removeAllCompleted() {
    vm.todos.forEach(todo => {
      if(todo.completed) {
        vm.todos.$remove(todo);
      }
    })
  }

  function showRemoveButton() {
    const completed = vm.todos.filter(todo => todo.completed);
    debugger
    return completed.length >= 2;
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['firebase'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
