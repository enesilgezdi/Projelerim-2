const todoInput = document.querySelector("#input-box");
const todoBtn = document.querySelector("#btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const toastAlert = document.querySelector(".alert");

runEventListeners()
function runEventListeners () {
    document.addEventListener("DOMContentLoaded" , getLocalTodos)
    todoBtn.addEventListener("click" , addTodo);
    todoList.addEventListener("click" , deleteCheck);
    filterOption.addEventListener("change" , filterTodo)
}


function addTodo (e) {
    if(todoInput.value.trim()){
        e.preventDefault();
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //ADDING TO LOCAL STORAGE 
        saveLocalTodos(todoInput.value);

        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></li>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn)

        todoList.appendChild(todoDiv);
        todoInput.value = "";
        showAlert("success" , "Başariyla eklendi")
    }else{
        e.preventDefault();
        showAlert("warning" , "lütfen boş giris yapmayınız")
    }
}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add("slide")

        removeLocalTodos(todo);
        todo.addEventListener("transitionend" ,function (){
            todo.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
    
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos (newTodo) {
    let todos;
    if(localStorage.getItem("todos" === null)){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getLocalTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) =>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></li>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn)

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert ( type, message) {
//     <div class="alert alert-danger" role="alert">
//   A simple danger alert—check it out!
// </div>

   const div =  document.createElement("div");
   div.className = `alert alert-${type}`;
   div.textContent = message;

   toastAlert.appendChild(div);

   setTimeout(() => {
    div.remove();
   }, 2500);
}