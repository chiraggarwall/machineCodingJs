//Showing & hiding popup
const addBox = document.querySelector(".add-box"),
  popUpBox = document.querySelector(".popup-box"),
  popUpTitle = document.querySelector("header p"),
  closeIcon = popUpBox.querySelector("header i"),
  button = popUpBox.querySelector("button"),
  title = popUpBox.querySelector(".title input"),
  description = popUpBox.querySelector(".description textarea");
let update = false,
  updateId;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
//showing Notes-->read operation
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove); //TO STOP DUPLICAY
  console.log("hello");
  notes.forEach((note, index) => {
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span></span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
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
//Showing edit option
function showMenu(element) {
  element.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target != element || e.target.tagName != "I") {
      element.parentElement.classList.remove("show");
    }
  });
}

//delete note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  console.log("deleted");
}

//update note
function updateNote(index, titl, des) {
  update = true;
  updateId = index;
  console.log(index, title, description);
  addBox.click();
  title.value = titl;
  description.value = des;
  console.log(title.value, description.value);
  button.innerText = "Update a Note";
  popUpTitle.innerText = "Update a Note";
}

addBox.addEventListener("click", () => {
  title.focus();
  button.innerText = "Add a Note";
  popUpTitle.innerText = "Add a Note";
  popUpBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
  popUpBox.classList.remove("show");
});

// Saving notes to the local storage-->>create operation

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value || description.value) {
    let now = new Date();
    let date = now.getDate();
    let Month = months[now.getMonth()];
    let Year = now.getFullYear();
    let notesInfo = {
      title: title.value,
      description: description.value,
      time: `${date} ${Month} ${Year}`,
    };
    if (!update) {
      //adding notes to the local storage
      notes.push(notesInfo);
    } else {
      notes[updateId] = notesInfo;
    }

    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click(); //closing popup on form submition
    title.value = "";
    description.value = "";
    console.log(notes, now);
  }
});
