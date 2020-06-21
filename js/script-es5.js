// User Constructor
function User(firstName, lastName, email, membership, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.membership = membership;
  this.gender = gender;
}

// UI Constructor
function UI() {}

// Add User to list
UI.prototype.addUserToList = function (user) {
  const list = document.getElementById("user-list");
  // Create tr element
  const row = document.createElement("tr");

  // Append td elements to row
  row.innerHTML = `
    <td>${user.firstName}</td>  
    <td>${user.lastName}</td> 
    <td>${user.email}</td> 
    <td>${user.membership}</td> 
    <td>${user.gender}</td>
    <td><a href="#" id="delete-item">X</td>  
  `;

  // Append row to #user-list
  list.appendChild(row);
};

// Show alert
UI.prototype.showAlert = function (message, className) {
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
};

// Delete user
UI.prototype.deleteUser = function (target) {
  if (target.id === "delete-item") {
    target.parentElement.parentElement.remove();
  }
};

// Clear fields
UI.prototype.clearFields = function () {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
};

// Event Listener for add user
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    // Get form values
    const firstName = document.getElementById("firstName").value,
      lastName = document.getElementById("lastName").value,
      email = document.getElementById("email").value,
      membership = document.getElementById("membership").value;
    gender = document.querySelector('input[name="gender"]:checked').value;

    // Instantiate user
    const user = new User(firstName, lastName, email, membership, gender);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (firstName === "" || lastName === "") {
      // Error alert
      ui.showAlert("Please fill in all fields", "error");
    } else {
      ui.addUserToList(user);

      // Show success
      ui.showAlert("User added!", "success");

      // Clear fields
      ui.clearFields();
    }

    e.preventDefault();
  });

// Event Listener for delete
document.getElementById("user-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete user
  ui.deleteUser(e.target);

  if (e.target.id === "delete-item") {
    // Show message
    ui.showAlert("User removed!", "success");
  }
  e.preventDefault();
});
