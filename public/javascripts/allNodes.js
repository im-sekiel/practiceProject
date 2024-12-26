class AllNodes {
  constructor() {
    this.mainNode = document.querySelector('main');
    this.mainTemplate = document.querySelector('#mainTemplate');
    this.contactsTemplate = document.querySelector('#contactsTemplate');
    this.addContactTemplate = document.querySelector('#addContactTemplate');
    this.addTagTemplate = document.querySelector('#addTagTemplate');
    this.confirmationPageTemplate = document.querySelector('#confirmationPageTemplate');
    this.updateContactTemplate = document.querySelector('#updateContactTemplate');
    this.handlebarTemplates();
  }

  initMainPageNodes() {
    let headerNodes = document.querySelector('.main-header').children;
    this.addContactNode = headerNodes[0]
    this.addTagNode = headerNodes[1];
    this.searchInput = headerNodes[2];
    this.resetSearchInput = headerNodes[3];
    this.allContactsParentNode = document.querySelector('.contacts');
  }

  initAddATagPageNodes() {
    this.tagForm = document.querySelector('.addTagGrid');
    let children = this.tagForm.children;

    this.tagTextInput = children[0];
    this.tagSubmitInput = children[1];
    this.tagCancelInput = children[2];
    this.tagMessageNode = children[3];
  }

  handlebarTemplates() {
    this.mainTemplateFunc = Handlebars.compile(this.mainTemplate.innerHTML);
    this.contactsTemplateFunc = Handlebars.compile(this.contactsTemplate.innerHTML);
    this.addContactTemplateFunc = Handlebars.compile(this.addContactTemplate.innerHTML);
    this.addTagTemplateFunc = Handlebars.compile(this.addTagTemplate.innerHTML);
    this.confirmationPageTemplateFunc = Handlebars.compile(this.confirmationPageTemplate.innerHTML);
    this.updateContactTemplateFunc = Handlebars.compile(this.updateContactTemplate.innerHTML);
  }

  initContactPageNodes() {
    this.formNode = document.querySelector('form');

    this.nameNode = document.querySelector('input#full_name');
    this.emailNode = document.querySelector('input#email');
    this.phoneNode = document.querySelector('input#phone_number');
    this.tagsNode = document.querySelector('#tags');
    this.submitNode = document.querySelector('input.submit');
    this.cancelNode = document.querySelector('input.cancel');
    this.nameErrorNode = document.querySelector('#nameError');
    this.emailErrorNode = document.querySelector('#emailError');
    this.phoneErrorNode = document.querySelector('#phoneError');
  }

}

export let allNodes = new AllNodes();