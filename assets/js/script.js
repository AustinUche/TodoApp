const btn = document.querySelector("#create-note");
const notes = document.querySelector(".main .container .right");

btn.addEventListener("click", () => {
    let note = document.createElement("div");
    note.setAttribute("class", "notes-container")
    notes.appendChild(note)

    let param = document.createElement("P")
    param.setAttribute("contenteditable", "true")
    note.appendChild(param)
});
