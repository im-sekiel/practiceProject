import { dataHandler } from "./dataHandler.js"
import { allNodes } from "./allNodes.js"

export class AppUI {
  constructor() {
    this.initData()
    this.displayLandingPage();
  }

  initData() {
    this.contacts;
    this.allTags;
    this.selectedTags = [];
  }

  getAllTags(json) {
    let arrays = json.map(obj => obj.tags ? obj.tags : [] );
    let allTags = [...new Set(arrays.flat())];

    this.allTags = allTags;
  }

  displayLandingPage() {
    allNodes.mainNode.innerHTML = allNodes.mainTemplateFunc();
    this.displayContacts();
  }

  displayContacts() {
    dataHandler.getAllContacts().then(json => {
      this.contacts = this.convertTagsIntoArray(json);
      
      if (!this.allTags) {
        this.getAllTags(json);
      }

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

  convertTagsIntoArrayForSingleContact(contact) {
    return contact.tags.split(',');
  }

  displayDeleteConfirmation() {
    allNodes.mainNode.innerHTML = allNodes.confirmationPageTemplateFunc() + allNodes.mainNode.innerHTML;
  }

  redisplayContactsBasedOnTag(tag) {
    this.toggleSelectedTags(tag);
    let contacts = this.filterContactsBasedOnSelectedTags();
    allNodes.contactsNode.innerHTML = allNodes.contactsTemplateFunc({ contacts });

    let allButtonTags = document.querySelectorAll('.tag');

    allButtonTags.forEach(button => {
      if (this.selectedTags.includes(button.textContent)) {     
        button.classList.remove('off');
        button.classList.add('on');
      }
    });
  }

  filterContactsBasedOnSelectedTags() {
    let contacts = this.selectedTags.map(tag => {
      return this.contacts.filter(contact => {
        if (!contact.tags) { // Checks that contact.tags is null/empty
          return false;
        }
        else if (contact.tags.includes(tag)) {
          return contact;
        }
      })
    });

    return [...new Set(contacts.flat())];
  }

  toggleSelectedTags(tag) {
    if (this.selectedTags.includes(tag)) {
      let index = this.selectedTags.indexOf(tag)
      this.selectedTags.splice(index, 1);
    }
    else {
      this.selectedTags.push(tag);
    }
  }

  addTagsToUpdateContact(contact) {
    allNodes.updateContactTagsNode = document.querySelector('#tags');

    if (!contact.tags) {
      this.allTags.forEach(tag => {
        let button = document.createElement('button');
        button.classList.add('buttonOff');
        button.textContent = tag;
        allNodes.updateContactTagsNode.appendChild(button);
      });
    }
    else {
      let tags = this.convertTagsIntoArrayForSingleContact(contact);

      this.allTags.forEach(tag => {
        let button = document.createElement('button');

        if (tags.includes(tag)) {
          button.classList.add('buttonOn');
        } else {
          button.classList.add('buttonOff');
        }
        button.textContent = tag;
        allNodes.updateContactTagsNode.appendChild(button);
      }); 
    }
  }

}