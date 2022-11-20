const fs = require("fs");
const path = require("path");
const contactsPath = __dirname + "/db/contacts.json";

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contacts = await getContacts();
  console.log(contacts);
}

async function getContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, "utf8", (error, fileContent) => {
      if (error) {
        throw error;
      }

      const contactsJson = fileContent.toString("utf8");
      const parsedData = JSON.parse(contactsJson);

      resolve(parsedData);
    });
  });
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const filteredContact = contacts.filter((contact) => contact.id == contactId);
  return filteredContact[0];
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const res = [];
  for (let contact of contacts) {
    if (+contact.id === contactId) {
      continue;
    }
    res.push(contact);
  }
  return await writeFile(res);
}

async function writeFile(arr) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(arr);
    fs.writeFile(contactsPath, json, (err) => {
      resolve();
    });
  });
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  const ids = contacts.map((object) => {
    return object.id;
  });
  const max = Math.max(...ids);
  const id = max + 1;
  const newContact = {
    id: id.toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  writeFile(contacts);
}

// function findOne = contacts;

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
