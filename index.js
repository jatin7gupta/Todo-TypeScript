
//getting all the Elements from the HTML page
const todoListId = 'activeTodoList';
const activeDiv = document.getElementById(todoListId);

const completedTodoListId = 'completedTodoListId';
const completedDiv = document.getElementById(completedTodoListId);

const deletedTodoListId = 'deletedTodoListId';
const deletedDiv = document.getElementById(deletedTodoListId);

function completeTodo(todoId) {
    todoObject.markCompleted(todoId-1);
    getAllTodo();
}

function deleteTodo(todoId) {
    todoObject.deleteTodo(todoId-1);
    getAllTodo();
}

function activeTodo(todoId) {
    todoObject.activateAgain(todoId-1);
    getAllTodo();
}

function addTodoToDOM(todoArrayObjects) {

    var todos={};

    todoArrayObjects.forEach(function(item) {
        todos[item.id] = item;

     });
    console.log(todos);

    function createTodoElement(id, todoObject) {
        const todoElement = document.createElement('div');

        todoElement.innerText = todoObject.name;
        todoElement.setAttribute('dataId', id);
        todoElement.setAttribute('class', `todoStatus${todoObject.status}`);

        if (todoObject.status === 'ACTIVE') {
            todoElement.innerText ='';
            const deleteButton = document.createElement('button');
            const label = document.createElement('label');
            const inputCheckBox = document.createElement('input');
            const span = document.createElement('span');
            const input= document.createElement('input');

             input.setAttribute('value',todoObject.name);
             input.setAttribute('class','input-class');
             input.setAttribute('onkeydown',`if(event.keyCode == 13) update(${todoObject.id},this.value);`);

            todoElement.appendChild(input);


            deleteButton.setAttribute('onclick', `deleteTodo(${id})`);
            deleteButton.setAttribute('class', 'close color-red');
            deleteButton.innerHTML = '&times';
            todoElement.appendChild(deleteButton);

            label.setAttribute('class', 'custom-control custom-checkbox');
            inputCheckBox.setAttribute('class', 'custom-control-input');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', `completeTodo(${id})`);
            span.setAttribute('class', 'custom-control-indicator top-8px');

            label.appendChild(inputCheckBox);
            label.appendChild(span);
            todoElement.insertBefore(label, todoElement.firstChild);
        }

        if (todoObject.status === 'COMPLETED') {
            todoElement.innerText = '';
            const del = document.createElement('del');
            const deleteButton = document.createElement('button');
            const label = document.createElement('label');
            const inputCheckBox = document.createElement('input');
            const span = document.createElement('span');

            del.innerHTML = todoObject.name;
            del.setAttribute('class', 'color-green');
            todoElement.appendChild(del);

            deleteButton.setAttribute('onclick', `deleteTodo(${id})`);
            deleteButton.setAttribute('class', 'close margin-top-4 color-red');
            deleteButton.innerHTML = '&times';
            todoElement.appendChild(deleteButton);

            label.setAttribute('class', 'custom-control custom-checkbox top-8px');
            inputCheckBox.setAttribute('class', 'custom-control-input');
            inputCheckBox.setAttribute('type', 'checkbox');
            inputCheckBox.setAttribute('onclick', `activeTodo(${id})`);
            inputCheckBox.setAttribute('checked', 'checked');
            span.setAttribute('class', 'custom-control-indicator');

            label.appendChild(inputCheckBox);
            label.appendChild(span);
            todoElement.insertBefore(label, todoElement.firstChild);
        }

        if (todoObject.status === 'DELETED') {
            todoElement.innerText = '';
            const del = document.createElement('del');

            del.innerHTML = todoObject.name;
            del.setAttribute('class', 'color-red');

            todoElement.appendChild(del);
        }

        return todoElement;
    }

    activeDiv.innerHTML = '';
    deletedDiv.innerHTML = '';
    completedDiv.innerHTML = '';

    Object.keys(todos).forEach(
        (key) => {
        const todoElement = createTodoElement(key, todos[key]);
    if (todos[key].status === 'ACTIVE') {
        activeDiv.appendChild(todoElement);
    } else if (todos[key].status === 'DELETED') {
        deletedDiv.appendChild(todoElement);
    } else {
        completedDiv.appendChild(todoElement);
    }
}
);
}

function getAllTodo() {
    var todos = todoObject.getActiceTodos();
    console.log(todos);
    addTodoToDOM(todos);
}

function addTodo() {
    const newTodoTitle = document.getElementById('NEW_TODO_INPUT_ID').value;
    //for removing the written material from the input
    document.getElementById('NEW_TODO_INPUT_ID').value = '';
    todoObject.addTodo(newTodoTitle, 'ACTIVE');
    getAllTodo();
}

function update(id, name) {
    todoObject.update(id-1,name);
    getAllTodo();
}


window.onload = getAllTodo();