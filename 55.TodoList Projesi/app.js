// TÜM ELEMENTLERİ SEÇMEK

const form = document.querySelector('#todoAddForm');
const addInput = document.querySelector('#todoName');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelector('#first-card');
const secondCardBody = document.querySelector('#second-card');
const clearButton = document.querySelector('#clearButton');
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();


function runEvents() {
    form.addEventListener("submit", addtodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach((todo) => {
        addTodoToUI(todo);
    })
}

function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoFilterListesi = document.querySelectorAll(".list-group-item");

    if (todoFilterListesi.length > 0) {
        todoFilterListesi.forEach((todo) => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display: block");
            } else {
                todo.setAttribute("style", "display: none !important");
            }
        });
    } else {
        showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır")
    }
}

function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") {
        //Ekrandan silmek
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        // Storageden silmek
        removeTodoToStorage(todo.textContent);
        showAlert("success", "Todo basari ile silindi");
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos))
}

function addtodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "lütfen değer giriniz!!");
    } else {
        //Arayüze Ekleme
        addTodoToUI(inputText);
        //Storage Ekleme
        addTodoToStorage(inputText);
        showAlert("success", "Todo Eklendi");
    }



    e.preventDefault();

}

function addTodoToUI(newTodo) {
    //     <!--
    //     <li class="list-group-item d-flex justify-content-between">Todo 1
    //         <a href="#" class="delete-item">
    //             <i class="fa fa-remove"></i>
    //         </a>
    //     </li>
    // -->
    const li = document.createElement("li");
    li.className = ("list-group-item d-flex justify-content-between");
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = ("delete-item");

    const i = document.createElement("i")
    i.className = ("fa fa-remove");

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}

function allTodosEverywhere() {
    const todosList = document.querySelectorAll(".list-group-item");
    if (todosList.length > 0) {
        //Ekrandan silme
        todosList.forEach((todo) => {
            todo.remove();
        })
        //Storageden silme
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos))
        showAlert("success", "Başarili bir şekilde silindi.")
    } else {
        showAlert("warning", "Silmek için en az bir todo olmalidir.")
    }
}