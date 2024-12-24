export class DataHandler {
  constructor() {
      
  }

  getAllContacts() {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/contacts');
    request.send();

    return new Promise((resolve, reject) => {
      request.addEventListener('load', event => {
        let responseJSON = JSON.parse(request.response);
        resolve(responseJSON);
      });
    });
  }

  saveAContact() {
    
  }
}
