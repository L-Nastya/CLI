const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid")

const contactsPath = path.join(__dirname,'/db/contacts.json');
console.log(contactsPath)

const updateContacts = async(contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    const result = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(result)
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const idtoString = String(contactId);
    const result = contacts.find(item => item.id === idtoString);
    return result || null;
}

async function removeContact(contactId) {
   const contacts = await listContacts();
   const idtoString = String(contactId);
   const index = contacts.findIndex(item => item.id === idtoString);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}


async function addContact({name, email, phone}) {
  const contacts = await listContacts();

    const newContact = {
        id: v4(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}