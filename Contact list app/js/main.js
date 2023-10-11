let contacts = [];
let contactIdCounter = 1;
let editContactId = null;

function togglePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = popup.style.display === "none" ? "block" : "none";
  document.getElementById("popupTitle").innerText = "Add New Contact";
  document.getElementById("saveButton").innerText = "Save";
  document.getElementById("contactId").value = "";
}

function addContact() {
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const homeAddress = document.getElementById("homeAddress").value;

  const contact = {
    id: contactIdCounter++,
    name: fullName,
    phone: phoneNumber,
    email: emailAddress,
    address: homeAddress,
  };

  contacts.push(contact);
  updateTable();
  togglePopup();

  // Clear form fields
  document.getElementById("fullName").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("emailAddress").value = "";
  document.getElementById("homeAddress").value = "";
}

function editContact(id) {
  const contact = contacts.find((contact) => contact.id === id);

  if (contact) {
    document.getElementById("contactId").value = contact.id;
    document.getElementById("fullName").value = contact.name;
    document.getElementById("phoneNumber").value = contact.phone;
    document.getElementById("emailAddress").value = contact.email;
    document.getElementById("homeAddress").value = contact.address;

    document.getElementById("popupTitle").innerText = "Edit Contact";
    document.getElementById("saveButton").innerText = "Update";
    editContactId = id;

    togglePopup();
  }
}

function saveContact() {
  const id = parseInt(document.getElementById("contactId").value);
  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const emailAddress = document.getElementById("emailAddress").value;
  const homeAddress = document.getElementById("homeAddress").value;

  if (editContactId !== null) {
    // Editing an existing contact
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    if (index !== -1) {
      contacts[index] = {
        id: editContactId,
        name: fullName,
        phone: phoneNumber,
        email: emailAddress,
        address: homeAddress,
      };
    }
    editContactId = null;
  } else {
    // Adding a new contact
    const contact = {
      id: contactIdCounter++,
      name: fullName,
      phone: phoneNumber,
      email: emailAddress,
      address: homeAddress,
    };
    contacts.push(contact);
  }

  updateTable();
  togglePopup();

  // Clear form fields
  // document.getElementById("contactId").value = "";
  document.getElementById("fullName").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("emailAddress").value = "";
  document.getElementById("homeAddress").value = "";
}

function updateTable() {
  const tableBody = document.getElementById("contactTable");
  tableBody.innerHTML = "";

  for (const contact of contacts) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>${contact.address}</td>
                    <td><button onClick="editContact(${contact.id})">Edit</button></td>
                    <td><button onclick="deleteContact(${contact.id})">Delete</button></td>
                `;

    tableBody.appendChild(row);
  }
}

function deleteContact(id) {
  contacts = contacts.filter((contact) => contact.id !== id);
  updateTable();
}

// Search functionality
document.getElementById("search").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchText) ||
      contact.phone.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      contact.address.toLowerCase().includes(searchText)
  );

  updateTable(filteredContacts);
});

// Initialize the table with any existing contacts
updateTable();
