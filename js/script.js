// Class User defined
class User {
  constructor(firstName, lastName, email, membership, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.membership = membership;
    this.gender = gender;
  }
}

// Class UI defined
class UI {
  // Add user to user list
  addUserToList(user) {
    // Get #user-list
    const list = document.getElementById("user-list");

    // Create tr element
    const row = document.createElement("tr");

    // Append td elements to row
    row.innerHTML = `
      <td>${user.firstName}</td>  
      <td>${user.lastName}</td> 
      <td>${user.membership}</td> 
      <td>${user.gender}</td>
      <td>${user.email}</td> 
      <td><a href="#" id="delete-item">X</td>  
    `;

    // Append row to #user-list
    list.appendChild(row);
  }

  // showAlert defined
  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");

    // Add classes
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent element
    const container = document.querySelector("#container");

    // Get form
    const form = document.querySelector("#register-form");

    // Insert alert
    container.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Delete user
  deleteUser(target) {
    if (target.id === "delete-item") {
      target.parentElement.parentElement.remove();
    }
  }

  // Clear fields after submit
  clearFields() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
  }
}

// Local Storage Class defined
class Store {
  // Get users from local storage
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    return users;
  }

  // Display users
  static displayUsers() {
    const users = Store.getUsers();

    users.forEach(function (user) {
      const ui = new UI();

      // Add user to UI
      ui.addUserToList(user);
    });
  }

  // Add user to local storage
  static addUser(user) {
    const users = Store.getUsers();

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
  }

  // Remove user from local storage
  static removeUser(email) {
    const users = Store.getUsers();

    users.forEach(function (user, index) {
      if (user.email === email) {
        users.splice(index, 1);
      }
    });

    localStorage.setItem("users", JSON.stringify(users));
  }
}

// DOM Load Event - Display users
document.addEventListener("DOMContentLoaded", Store.displayUsers);

// Validate Form Fields

// Form Blur Event Listeners
document
  .getElementById("firstName")
  .addEventListener("blur", validateFirstName);
document.getElementById("lastName").addEventListener("blur", validateLastName);
document.getElementById("email").addEventListener("blur", validateEmail);

// Validate First Name
function validateFirstName() {
  const regex = /^[a-zA-Z]{2,10}$/;

  if (!regex.test(firstName.value)) {
    var message = "First Name must be at least 2 characters long.";
  } else {
    message = "";
  }

  firstName.nextElementSibling.innerHTML = message;
}

// Validate Last Name
function validateLastName() {
  const regex = /^[a-zA-Z]{2,10}$/;

  if (!regex.test(lastName.value)) {
    var message = "Last Name must be at least 2 characters long.";
  } else {
    message = "";
  }

  lastName.nextElementSibling.innerHTML = message;
}

// Validate Email
function validateEmail() {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (!regex.test(email.value)) {
    var message = "Enter a valid email address.";
  } else {
    message = "";
  }

  email.nextElementSibling.innerHTML = message;
}

// Event Listener for add user
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    // Get form values
    const firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      email = document.getElementById("email").value,
      membership = document.getElementById("membership").value,
      gender = document.querySelector('input[name="gender"]:checked').value;

    // Instantiate user
    const user = new User(firstName, lastName, email, membership, gender);

    // Instantiate UI
    const ui = new UI();

    // Validate if form fields are empty
    if (firstName === "" || lastName === "") {
      // Error alert
      ui.showAlert("Please fill in all fields", "error");
    } else {
      // Add user to list
      ui.addUserToList(user);

      // Add to local storage
      Store.addUser(user);

      // Show success
      ui.showAlert("User added!", "success");

      // Clear fields
      ui.clearFields();
    }

    // Prevent default link action
    e.preventDefault();
  });

// Event Listener for delete user
document.getElementById("user-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete user
  ui.deleteUser(e.target);

  // Remove from local storage
  Store.removeUser(e.target.parentElement.previousElementSibling.textContent);

  /* Prevent show alert message when click 
  outside of delete(X) button - event delegation */
  if (e.target.id === "delete-item") {
    // Show message
    ui.showAlert("User removed!", "success");
  }

  // Prevent default link action
  e.preventDefault();
});

// Filter Search

// Get search input element
const search = document.querySelector("#search");

// Filter tasks event
search.addEventListener("keyup", searchUser);

// Filter Tasks
function searchUser(e) {
  // Get table element
  table = document.getElementById("table");

  // Get tr element
  tr = table.getElementsByTagName("tr");

  // Get text from the tr element and make it lower case
  const text = e.target.value.toLowerCase();

  // Loop through content of the tr element
  for (i = 0; i < tr.length; i++) {
    // Get td element
    td = tr[i].getElementsByTagName("td")[0];

    /* Check if text content from the input search is 
      equal to user text content from the users list */
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(text) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
