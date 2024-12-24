import { allNodes } from "./allNodes.js"

export class AppEvents {
  constructor() {
    this.addEventsToLandingPage();
  }

  addEventsToLandingPage() {
    allNodes.initMainPageNodes();

    allNodes.addContactNode.addEventListener('click', event => {
      event.preventDefault();
      allNodes.mainNode.innerHTML = allNodes.addContactTemplateFunc();
      this.addEventsToAddContactPage();
    })
  }

  addEventsToAddContactPage() {
    allNodes.initContactPageNodes();

    this.cancelInputEvent();
    this.submitFormEvent();
    this.nameInputEvent();
  }

  submitFormEvent() {
    allNodes.formNode.addEventListener('submit', event => {
      event.preventDefault();
      if (allNodes.formNode.checkValidity()) {
        // Process the form
        console.log('asdasdsa');
        let json = this.formDataIntoJSON(new FormData(allNodes.formNode));
      } else {
        return;
      }
    })
  }

  cancelInputEvent() {
    allNodes.cancelNode.addEventListener('click', event => {
      // event.preventDefault();
      // returns to normal page
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
      case 'name':
        errorNode = allNodes.nameErrorNode;
        errorText = 'Please include a first name and last name separated by a space';
        break;
      case 'email':
        errorNode = allNodes.emailErrorNode;
        errorText = 'Please include an email';
        break;
      case 'phone':
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
      json[pair[0]] = pair[1];
    }

    if (!json['tags']) {
      json['tags'] = null;
    }
    
    return json;
  }


}