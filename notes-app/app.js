const btn = document.querySelector(".btn");
const notesContainer = document.querySelector(".notes-container");
let notes = document.querySelectorAll(".input-box");

runEventListeners()
function runEventListeners() {
    btn.addEventListener("click", createNotes);
    notesContainer.addEventListener("click", deleteNotes)
}

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes")
}
showNotes()

function updatesNotes() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

function createNotes() {
    // <!-- <p contenteditable="true" class="input-box">
    // <img src="images/delete.png">
    // </p> -->
    const p = document.createElement("p");
    p.setAttribute("contenteditable", "true");
    p.classList.add("input-box");

    const img = document.createElement("img");
    img.src = "images/delete.png";


    p.appendChild(img);
    notesContainer.appendChild(p);

}

function deleteNotes(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove()
        updatesNotes();
    } else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updatesNotes();
            }
        })
    }

}


document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})