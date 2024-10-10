let tablebody = document.querySelector("#userTable tbody");
let users = [];
let nameSortOrder = `asc`;

async function fetchUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    users = data.users;
    renderTable(users);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}
fetchUsers(); //Use init function

function renderTable(users) {
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);//used to remove child element
  }
  users.forEach((user, index) => {
    let color = index % 2 == 0 ? "orange" : "red";
    let row = `<tr class=${color}>
        <td>${user.firstName + " " + user.lastName}</td>
        <td>${user.age}</td>
    </tr>`;
    tablebody.insertAdjacentHTML("beforeend", row); //"beforeend": Just inside the element, after its last child.
  });
}

function searchUser(e) {
  let searchInput = e.target.value.toLowerCase();
  let updatedUser = [];
  users.forEach((user) => {
    let name = `${user.firstName.toLowerCase() + user.lastName.toLowerCase()}`;
    if (name.includes(searchInput)) {
      //text.indexOf("welcome");
      updatedUser.push(user);
    }
  });
  renderTable(updatedUser);
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

document.getElementById("search").addEventListener("keyup", searchUser);
document.getElementById("nameHeader").addEventListener("click", sortByName);

//get tbody
//get users data using async await in [json] format
//loop users array and add each row in tbody using insertadjacentHTML
//search-->check whether name.includes(e.target.value) if yes than push that array in updated array & renderTable(updatedArrayUser)
//sort-->sortbyname get called first--> calls sort(order) & reverse the order and then .in sort(order) user.sort(a,b)
//a-b for asc ,b-a for desc

//loading
//sorting by age
//paginated view -->page size 5,10,15 with dropdown
//edit option in age -->input field 

