import { Command } from "commander";
import contactsService from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.log("allContacts:", allContacts);

    case "get":
      const contactsById = await contactsService.getContactById(id);
      return console.log("contactsById:", contactsById);

    case "add":
      const newMovie = await contactsService.addContact(name, email, phone);
      return console.log("newMovie:", newMovie);

    case "remove":
      const deleteContact = await contactsService.removeContact(id);
      return console.log("deleteContact:", deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
