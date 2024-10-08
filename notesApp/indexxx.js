let addBox = document.querySelector(".add-box");
let popup = document.querySelector(".popup-box");
let close = popup.querySelector(".popup-box i");
const button = document.querySelector("button");
let title = popup.querySelector(".popup-box .title input");
let decs = popup.querySelector(".description textarea");
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
// let notes = JSON.parse(localStorage.getItem("notes")) || []; cause error for invalid json string

let note = document.querySelectorAll(".note");

addBox.addEventListener("click", () => {
  popup.classList.add("show");
});

close.addEventListener("click", () => {
  popup.classList.remove("show");
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  close.click();
  if (title || decs) {
    let notesInfo = {
      title: title.value,
      description: decs.value,
    };

    notes.push(notesInfo);
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  show();
  title.value = "";
  decs.value = "";
});

function show() {
  note.forEach((note, index) => {
    note.remove(); //method to remove element itself
  });
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span></span>
        </div>
        <div class="bottom-content">
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu">
                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                    <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
