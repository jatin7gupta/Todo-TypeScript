var ACTIVE = 'ACTIVE';
var DELETED = 'DELETED';
var COMPLETED = 'COMPLETED';
var TodoClass = /** @class */ (function () {
    function TodoClass() {
        this.todoDB = [];
        TodoClass.idIndex = 1;
    }
    TodoClass.prototype.addTodo = function (name, status) {
        var inputElement = {
            name: name,
            status: status,
            id: this.todoDB.length + 1
        };
        this.todoDB.push(inputElement);
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    };
    TodoClass.prototype.deleteTodo = function (id) {
        this.todoDB[id].status = DELETED;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    };
    TodoClass.prototype.getActiceTodos = function (status) {
        var retVal = [];
        var val = JSON.parse(localStorage.getItem('KEY'));
        this.todoDB = val ? val : [];
        if (status) {
            this.todoDB.forEach(function (element) {
                if (element.status === status) {
                    retVal.push(element);
                }
            });
        }
        else {
            this.todoDB.forEach(function (element) {
                retVal.push(element);
            });
        }
        return retVal;
    };
    TodoClass.prototype.update = function (id, name) {
        this.todoDB[id].name = name;
        this.todoDB[id].status = ACTIVE;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    };
    TodoClass.prototype.activateAgain = function (id) {
        this.todoDB[id].status = ACTIVE;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    };
    TodoClass.prototype.markCompleted = function (id) {
        this.todoDB[id].status = COMPLETED;
        localStorage.setItem('KEY', JSON.stringify(this.todoDB));
    };
    return TodoClass;
}());
var todoObject = new TodoClass();
