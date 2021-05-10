const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "bd", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
    console.log("The contacts list was read");
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts.find(({ id }) => String(id) === contactId));
    console.log("The contact was found ");
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    const contacts = JSON.parse(data).filter(
      ({ id }) => String(id) !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.log(error.message);
        return;
      }
      console.table(contacts);
      console.log("the contact was  removed");
    });
  });
}

function addContact(name, email, phone) {
  const contact = { id: shortid.generate(), name, email, phone };
  fs.readFile(contactsPath, (err, data) => {
    const contacts = JSON.stringify([...JSON.parse(data), contact]);
    if (err) {
      console.log(err.message);
      return;
    }
    fs.writeFile(contactsPath, contacts, (err) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(JSON.parse(contacts));
      console.log("The contacts was added");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
