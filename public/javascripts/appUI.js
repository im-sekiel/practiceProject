import { DataHandler } from "./dataHandler.js"
import { allNodes } from "./allNodes.js"

export class AppUI {
  constructor() {
    this.initData()
    this.displayLandingPage();
  }

  initData() {
    this.contacts;
    this.dataHandler = new DataHandler();
  }

  handlebarTemplates() {
    allNodes.mainTemplateFunc = Handlebars.compile(allNodes.mainTemplate.innerHTML);
    allNodes.contactsTemplateFunc = Handlebars.compile(allNodes.contactsTemplate.innerHTML);
    allNodes.addContactTemplateFunc = Handlebars.compile(allNodes.addContactTemplate.innerHTML);
  }

  displayLandingPage() {
    allNodes.mainNode.innerHTML = allNodes.mainTemplateFunc();
    this.displayContacts();
  }

  displayContacts() {
    this.dataHandler.getAllContacts().then(json => {
      this.contacts = this.convertTagsIntoArray(json);
      allNodes.contactsNode = document.querySelector('.contacts');
      allNodes.contactsNode.innerHTML = allNodes.contactsTemplateFunc({contacts: this.contacts});
    });
  }

  convertTagsIntoArray(json) {
    return json.map(contact => {
      if (contact.tags !== null) {
        contact.tags = contact.tags.split(',');
      }
      return contact;
    })
  }
}