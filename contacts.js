const fs = require('fs');
const path = require('path');
const contactsPath = __dirname + '/db/contacts.json';

console.log(removeContact(8))

// TODO: задокументувати кожну функцію
async function listContacts() {
    const contacts = await getContacts();
    console.log(contacts);
}

async function getContacts() {
    return new Promise((resolve, reject) => {
        fs.readFile(contactsPath, 'utf8', (error, fileContent) => {
            if (error) {
                throw error;
            }

            const contactsJson = fileContent.toString('utf8');
            const parsedData = JSON.parse(contactsJson);

            resolve(parsedData);
        });
    });
}

async function getContactById(contactId) {
    const contacts = await getContacts();
    const filteredContact = contacts.filter(contact => contact.id == contactId);
    return filteredContact[0];
}

async function removeContact(contactId) {
    const contacts = await getContacts();
    for (let i; i < contacts.length; i++) {
        console.log(contacts[i]);
        if (contacts[i].id == contactId) {
            console.log(contacts[i]);
            delete contacts[contact];
            console.log(contacts[contact]);
            console.log(contacts.length);
        }
    }
}

function addContact(name, email, phone) {
    // ...твій код
}


// function findOne = contacts;

module.exports = {
    listContacts,
    getContacts,
    getContactById,
    removeContact,
    addContact
}
