import { DataHandler } from "./dataHandler.js"
import { AppUI } from "./appUI.js"
import { AppEvents } from "./appEvents.js"
import { allNodes } from "./allNodes.js"

  // {
  //   "id": 1,
  //   "full_name": "Arthur Dent",
  //   "email": "dent@example.com",
  //   "phone_number": "12345678901",
  //   "tags": "work,business"
  // }

class App {
  constructor() {
    this.appUI = new AppUI();
    this.appEvents = new AppEvents();
  }

  
}

document.addEventListener('DOMContentLoaded', () => {
  let app = new App();
});