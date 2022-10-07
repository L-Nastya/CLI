const contacts = require('./contact');

const argv = require("yargs").argv;


const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
          const allContacts = await contacts.listContacts();
          console.log(allContacts)
      break;
    case 'get':
          const oneContact = await contacts.getContactById(id)
          console.log(oneContact)
      break;
      case "remove":
          const deleteContact = await contacts.removeContact(id)
          console.log(deleteContact)
          break;
        case 'add':
          const add = await contacts.addContact({name,email,phone})
          console.log(add)
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const start = async (argv) => {
    try {
        await invokeAction(argv);
    } catch (error) {
        console.log(error);
    }
};
start(argv);
