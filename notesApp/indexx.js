const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector(".popup-box i");
let title = document.querySelector(".popup-box .title input");
let description = document.querySelector(".description textarea");
const button = document.querySelector("button");
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let update = false,
  updateId;
//popup

addBox.addEventListener("click", () => {
  popupBox.classList.add("show");
  button.innerText = "Add Note";
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
  title.value = "";
  description.value = "";
});

//storing data in local storag
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value || description.value) {
    let notesInfo = {
      title: title.value,
      description: description.value,
    };

    if (!update) {
      notes.push(notesInfo);
    } else {
      notes[updateId] = {
        title: title.value,
        description: description.value,
      };
    }

    localStorage.setItem("notes", JSON.stringify(notes)); //json.stringify is used to convert js object to json string.
    showNotes();
    closeIcon.click();
    title.value = "";
    description.value = "";
  }
});

//reading data from local storage
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => {
    note.remove();
  });

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
    addBox.insertAdjacentHTML("afterend", liTag); //"afterend": After the element itself.
  });
}

//show edit menu
function showMenu(element) {
  element.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (element != e.target) {
      element.parentElement.classList.remove("show");
    }
  });
}

//delete note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
  console.log("deleted", notes);
}

//edit note
function updateNote(index, tit, desc) {
  updateId = index;
  update = true;
  addBox.click();
  title.value = tit;
  description.value = desc;
  button.innerText = "Update Note";
}

//click on add => pop up comes
//click on close in pop up to close pop up
//click add button => close get clicked ,value in title,description saved to local storage from array & then value of title,decs get null,show() call
//show()=>show remove all notes, render notes array add li tag to afterend of add button.
//delete=>call delete function(index), notes.splice(index,1),localstorage,show()
//update=>call update fucntion(index,title,desc),click.addBox ,title.value=title,description.value=desc,update=true,in button() if update=true than notes[updateId] = {title: title.value,description: description.value,};
