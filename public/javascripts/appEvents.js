import { allNodes } from "./allNodes.js"
import { AppUI } from "./appUI.js"
import { dataHandler } from "./dataHandler.js"

export class AppEvents {
  constructor() {
    this.appUI = new AppUI();
    this.addEventsToLandingPage();
  }

  addEventsToLandingPage() {
    allNodes.initMainPageNodes();

    this.addHandlerToAddContactNode();
    this.addHandlerToAddTagNode();
    this.addHandlerToSearchInputNode();
    this.addHandlerToResetButton();
    this.addHandlerToAllButtonsOnLanding();
  }

  addHandlerToAllButtonsOnLanding() {
    allNodes.allContactsParentNode.addEventListener('click', event => {
      event.preventDefault();
      let element = event.target;

      if (element.nodeName === 'BUTTON' && element.classList.contains('delete')) {
        this.eventForDeleteButton(element);
      }
      else if (element.nodeName === 'BUTTON' && element.classList.contains('tag')) {
        let tag = element.textContent;
        this.appUI.redisplayContactsBasedOnTag(tag)
      }
      else if (element.nodeName === 'BUTTON' && element.classList.contains('edit')) {
        this.eventForEditButton(element);
      } 

    });
  }

  eventForEditButton(element) {
    let id = element.parentNode.getAttribute('data-id');
    let contact;

    dataHandler.getAContact(id).then(json => {
      contact = json;
      allNodes.mainNode.innerHTML = allNodes.updateContactTemplateFunc(contact);
      this.appUI.addTagsToUpdateContact(contact);
      allNodes.initContactPageNodes();
      let phone = allNodes.phoneNode.value;

      if (!phone.includes('-')) {
        allNodes.phoneNode.value = `${phone[0]}-${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7, 11)}`;
      }
      this.addEventsToUpdateContactPage(id);
    });
  }

  updateFormEvent(id) {
    allNodes.formNode.addEventListener('submit', event => {
      event.preventDefault();

      if (allNodes.formNode.checkValidity()) {
        let tags = this.selectedTagsIntoString();
        let json = this.formDataIntoJSON(new FormData(allNodes.formNode));
        json.tags = tags;
        json.id = id;
        dataHandler.updateContact(id, json).then(value => {
          this.appUI.displayLandingPage();
          this.addEventsToLandingPage();
        })
      } 
      else {
        return;
      }
    })
  }

  eventForDeleteButton(element) {
    let id = element.parentNode.getAttribute('data-id');

    this.appUI.displayDeleteConfirmation();
    allNodes.deleteConfirmationNode = document.querySelector('#deleteConfirmation');
    allNodes.grayEverywhereNode = document.querySelector('#grayEverywhere');
    this.handlerForDisplayDeleteConfirmation(id);
  }

  addEventsToUpdateContactPage(id) {
    allNodes.initContactPageNodes();

    this.cancelInputEvent();
    this.updateFormEvent(id);
    this.nameInputEvent();
    this.tagsEvent();
  }

  handlerForDisplayDeleteConfirmation(id) {
    allNodes.deleteConfirmationNode.addEventListener('click', event => {
      let element = event.target;

      if (element.nodeName === 'INPUT' && element.value === "Don't delete") {
        allNodes.deleteConfirmationNode.remove();
        allNodes.grayEverywhereNode.remove();
        this.appUI.displayLandingPage();
        this.addEventsToLandingPage();
      }
      else if (element.nodeName === 'INPUT' && element.value === "Yes, delete") {
        dataHandler.deleteAContact(id).then(value => {
          if (value === 204) {
            allNodes.deleteConfirmationNode.remove();
            allNodes.grayEverywhereNode.remove();
            this.appUI.displayLandingPage();
            this.addEventsToLandingPage();
          }
        });
      }
    })

    allNodes.grayEverywhereNode.addEventListener('click', event => {
      allNodes.deleteConfirmationNode.remove();
      allNodes.grayEverywhereNode.remove();
      this.addEventsToLandingPage();
    })
  }

  addHandlerToResetButton() {
    allNodes.resetSearchInput.addEventListener('click', event => {
      this.appUI.displayContacts();
    })
  }

  addHandlerToSearchInputNode() {
    allNodes.searchInput.addEventListener('keyup', event => {
      let value = event.target.value.trim().toLowerCase();

      if (value === '') {
        this.appUI.displayContacts();
        return;
      }
      else {
        let contacts = this.filterContacts(this.appUI.contacts, value)
        allNodes.contactsNode.innerHTML = allNodes.contactsTemplateFunc({contacts});
      }
    });
  }

  addHandlerToAddTagNode() {
    allNodes.addTagNode.addEventListener('click', event => {
      event.preventDefault();

      allNodes.mainNode.innerHTML = allNodes.addTagTemplateFunc();
      allNodes.initAddATagPageNodes();
      this.addEventsToAddATagPage();
    });
  }

  addHandlerToAddContactNode() {
    allNodes.addContactNode.addEventListener('click', event => {
      event.preventDefault();

      allNodes.mainNode.innerHTML = allNodes.addContactTemplateFunc({tags: this.appUI.allTags});
      this.addEventsToAddContactPage();
    });
  }

  filterContacts(allContacts, value) {
    let length = value.length;

    return allContacts.filter(contact => {
      return contact.full_name.toLowerCase().slice(0, length) === value;
    });
  }

  addEventsToAddContactPage() {
    allNodes.initContactPageNodes();

    this.cancelInputEvent();
    this.submitFormEvent();
    this.nameInputEvent();
    this.tagsEvent();
  }

  addEventsToAddATagPage() {
    this.cancelInputEventForTagPage();
    this.textInputEventForTagPage();
    this.submitInputEventForTagPage();
  }

  submitInputEventForTagPage() {
    allNodes.tagForm.addEventListener('submit', event => {
      if (allNodes.tagTextInput.value.trim() === '') {
        return;
      }
      else {
        let value = allNodes.tagTextInput.value.trim().toLowerCase();

        allNodes.tagTextInput.value = '';

        if (this.appUI.allTags.includes(value)) {
          allNodes.tagMessageNode.classList.add('errorText');
          allNodes.tagMessageNode.textContent = 'Tag already exists.'
        }
        else {
          this.appUI.allTags.push(value);
          allNodes.tagMessageNode.classList.add('successText');
          allNodes.tagMessageNode.textContent = 'Tag successfully added.'
        }
      }
    });
  }

  textInputEventForTagPage() {
    allNodes.tagTextInput.addEventListener('blur', event => {
      if (event.target.value.trim() === '') {
        allNodes.tagMessageNode.classList.add('errorText')
        allNodes.tagMessageNode.classList.add('redText')
        allNodes.tagMessageNode.textContent = "Input field cannot be blank";
        allNodes.tagTextInput.classList.add('redBorder');
      }
      else {
        allNodes.tagMessageNode.classList.remove('errorText');
        allNodes.tagMessageNode.classList.remove('redText');
        allNodes.tagTextInput.classList.remove('redBorder');
        allNodes.tagMessageNode.textContent = "";
      }
    });
  }

  selectedTagsIntoString() {
    let tags = [];

    for (let node of allNodes.tagsNode.children) {
      if (node.classList.contains('buttonOn')) tags.push(node.textContent); 
    }

    return tags.join(',')
  }

  submitFormEvent() {
    allNodes.formNode.addEventListener('submit', event => {
      event.preventDefault();

      if (allNodes.formNode.checkValidity()) {
        let tags = this.selectedTagsIntoString();
        let json = this.formDataIntoJSON(new FormData(allNodes.formNode));
        json.tags = tags;
        dataHandler.saveAContact(json).then(value => {
          this.appUI.displayLandingPage();
          this.addEventsToLandingPage();
        })
      } else {
        return;
      }
    })
  }

  cancelInputEventForTagPage() {
    allNodes.tagCancelInput.addEventListener('click', event => {
      event.preventDefault();
      this.appUI.displayLandingPage();
      this.addEventsToLandingPage();
    })
  }

  cancelInputEvent() {
    allNodes.cancelNode.addEventListener('click', event => {
      event.preventDefault();
      this.appUI.displayLandingPage();
      this.addEventsToLandingPage();
    })
  }

  tagsEvent() {
    allNodes.tagsNode.addEventListener('click', event => {
      event.preventDefault();

      if (event.target.nodeName === 'BUTTON') {
        if (event.target.classList.contains('buttonOff')) {
          event.target.classList.remove('buttonOff');
          event.target.classList.add('buttonOn');
        }
        else {
          event.target.classList.remove('buttonOn');
          event.target.classList.add('buttonOff');
        }
      }
    })
  }

  nameInputEvent() {
    [allNodes.nameNode, allNodes.emailNode, allNodes.phoneNode].forEach(node => {
      node.addEventListener('blur', this.inputHandler);
    });
  }

  inputHandler(event) {
    let errorNode;
    let errorText;

    switch(event.target.name) {
      case 'full_name':
        errorNode = allNodes.nameErrorNode;
        errorText = 'Please include a first name and last name separated by a space';
        break;
      case 'email':
        errorNode = allNodes.emailErrorNode;
        errorText = 'Please include an email';
        break;
      case 'phone_number':
        errorNode = allNodes.phoneErrorNode;
        errorText = 'Please make sure the telephone format is as follows: #-###-###-####';
        break;
    }

    if (event.target.checkValidity()) {
      event.target.classList.remove('redBorder');
      errorNode.textContent = '';
    }
    else {
      event.target.classList.add('redBorder');
      errorNode.textContent = errorText;
    }
  }

  formDataIntoJSON(formData) {
    let json = {};

    for (let pair of formData.entries()) {
      if (pair[0] === 'phone') {
        json[pair[0]] = pair[1].split('-').join('');
      } else {
        json[pair[0]] = pair[1];
      }
    }

    if (!json['tags']) {
      json['tags'] = null;
    }
    
    return json;
  }


}