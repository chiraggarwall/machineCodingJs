let tablebody = document.querySelector("#userTable tbody");
let users = [];
let updatedUser = [];
let nameSortOrder = `asc`;
let pageSize = 3;
let currentPage = 1;
let loading = document.getElementById("loading");
async function fetchUsers() {
  try {
    loading.style.display = "block";
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    users = data.users;
    updatedUser = users;
    renderTable(users);
    renderPagination(users);
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    loading.style.display = "none";
  }
}
fetchUsers(); //Use init function

function renderTable(users) {
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  // Determine the start and end indexes for pagination
  let start = (currentPage - 1) * pageSize;
  let end = start + pageSize;
  let paginatedUsers = users.slice(start, end); //exclude element at end index
  console.log(paginatedUsers);
  paginatedUsers.forEach((user, index) => {
    let color = index % 2 === 0 ? "orange" : "red";
    let row = `<tr class=${color}>
        <td>${user.firstName + " " + user.lastName}</td>
        <td contenteditable="true" onblur="updateAge(${users.indexOf(
          user
        )}, this
        )">${user.age}</td>
    </tr>`;
    tablebody.insertAdjacentHTML("beforeend", row);
  });
}

function updateAge(index, element) {
  let newAge = parseInt(element.innerText);
  if (!isNaN(newAge) && newAge > 0) {
    users[index].age = newAge;
  } else {
    element.innerText = users[index].age;
  }
}

function myFunction(i) {
  currentPage = i;
  renderTable(updatedUser);
}

function renderPagination(user) {
  pagination.innerHTML = "";
  const paginationElement = document.getElementById("pagination");

  const pageCount = Math.ceil(user.length / pageSize);
  for (i = 1; i <= pageCount; i++) {
    let pageButton = `<button onclick="myFunction(${i})">${i}</button>`;
    pagination.insertAdjacentHTML("beforeend", pageButton);
  }
}

function searchUser(e) {
  let searchInput = e.target.value.toLowerCase();
  updatedUser = [];
  users.forEach((user) => {
    let name = `${user.firstName.toLowerCase() + user.lastName.toLowerCase()}`;
    if (name.includes(searchInput)) {
      //text.indexOf("welcome");
      updatedUser.push(user);
    }
  });
  currentPage = 1;
  renderTable(updatedUser);
  renderPagination(updatedUser);
}

function sortUsers(order) {
  users.sort((a, b) => {
    return order === "asc"
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName);
  });
  renderTable(users);
}

function sortByName() {
  sortUsers(nameSortOrder);
  nameSortOrder = nameSortOrder === "asc" ? "desc" : "asc";
}

let search = document.getElementById("search");
let sortName = document.getElementById("nameHeader");
let pagination = document.getElementById("pagination");
let page = document.getElementById("pageSize");
page.addEventListener("change", (e) => {
  pageSize = parseInt(e.target.value);
  renderPagination(updatedUser);
  renderTable(updatedUser);
});

search.addEventListener("keyup", searchUser);
sortName.addEventListener("click", sortByName);

//get tbody
//get users data using async await in [json] format
//loop users array and add each row in tbody using insertadjacentHTML
//search-->check whether name.includes(e.target.value) if yes than push that array in updated array & renderTable(updatedArrayUser)
//sort-->sortbyname get called first--> calls sort(order) & reverse the order and then .in sort(order) user.sort(a,b)
//a-b for asc ,b-a for desc
//pageSize-->(renderPagination(user)-->pageCount-->button add --> function --> current page =i renderTable(user)  )--> renderTable-->start,end,paginated user,loop,element add
//loading
//sorting by age
//paginated view -->page size 5,10,15 with dropdown
//edit option in age -->input field
