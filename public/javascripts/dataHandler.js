class DataHandler {
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

  saveAContact(json) {
    let request = new XMLHttpRequest();
    request.open('POST', '/api/contacts/');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(json));

    return new Promise((resolve, reject) => {
      request.addEventListener('load', event => {
        if (request.status === 400) {
          console.log('Something went wrong');
        } else {
          let responseJSON = JSON.parse(request.response);
          resolve(responseJSON);
        }
      })
    });
  }

  deleteAContact(id, json) {
    let request = new XMLHttpRequest();
    request.open('DELETE', `api/contacts/${id}`);
    request.send();

    return new Promise((resolve, reject) => {
      request.addEventListener('load', event => {
        resolve(request.status);
      })
    });
  }

  getAContact(id) {
    let request = new XMLHttpRequest();
    request.open('GET', `api/contacts/${id}`);
    request.send();

    return new Promise((resolve, reject) => {
      request.addEventListener('load', event => {
        let responseJSON = JSON.parse(request.response);
        resolve(responseJSON);
      });
    });
  }

  updateContact(id, json) {
    let request = new XMLHttpRequest();
    request.open('PUT', `/api/contacts/${id}`);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(json));
    
    return new Promise((resolve, reject) => {
      request.addEventListener('load', event => {
        if (request.status === 400) {
          console.log('Something went wrong');
        } else {
          let responseJSON = JSON.parse(request.response);
          resolve(responseJSON);
        }
      })
    });
  }
}

export const dataHandler = new DataHandler();
