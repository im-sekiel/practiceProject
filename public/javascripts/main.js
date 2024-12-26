import { dataHandler } from "./dataHandler.js"
import { AppUI } from "./appUI.js"
import { AppEvents } from "./appEvents.js"
import { allNodes } from "./allNodes.js"

class App {
  constructor() {
    this.appEvents = new AppEvents();
  }  
}

document.addEventListener('DOMContentLoaded', () => {
  let app = new App();
});