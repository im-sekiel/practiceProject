class AllNodes {
  constructor() {
    this.mainNode = document.querySelector('main');
    this.mainTemplate = document.querySelector('#mainTemplate');
    this.contactsTemplate = document.querySelector('#contactsTemplate');
    this.addContactTemplate = document.querySelector('#addContactTemplate');
    this.handlebarTemplates();
  }

  initMainPageNodes() {
    let headerNodes = document.querySelector('.main-header').children;
    this.addContactNode = headerNodes[0]
    this.addTagNode = headerNodes[1];
  }

  handlebarTemplates() {
    this.mainTemplateFunc = Handlebars.compile(this.mainTemplate.innerHTML);
    this.contactsTemplateFunc = Handlebars.compile(this.contactsTemplate.innerHTML);
    this.addContactTemplateFunc = Handlebars.compile(this.addContactTemplate.innerHTML);
  }

  initContactPageNodes() {
    this.formNode = document.querySelector('form');

    this.nameNode = document.querySelector('input#name');
    this.emailNode = document.querySelector('input#email');
    this.phoneNode = document.querySelector('input#phone');
    this.tagsNode = document.querySelector('#tags');
    this.submitNode = document.querySelector('input.submit');
    this.cancelNode = document.querySelector('input.cancel');
    this.nameErrorNode = document.querySelector('#nameError');
    this.emailErrorNode = document.querySelector('#emailError');
    this.phoneErrorNode = document.querySelector('#phoneError');
  }

}

export let allNodes = new AllNodes();