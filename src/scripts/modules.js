import navigation from "./modules/navigation";
import horizontalScroll from "./modules/horizontalScroll";
import calendar from "./modules/calendar";
import teamUser from "./modules/teamUser";

class Modules {
  constructor() {
    this.modules = {
      'navBar': navigation,
      'horizontalScroll': horizontalScroll,
      'calendar': calendar,
      'teamUser': teamUser
    }
  }

  run() {
    const DOMModules = document.querySelectorAll('[data-module]');

    DOMModules.forEach(domModuleEl => {
      const module = domModuleEl.getAttribute('data-module');

      try {
        this.modules[module](domModuleEl);
        console.log(`%c Module ${module} start success.`, 'color: green');
      } catch (e) {
        console.log(`%c Module ${module} error: ${e}`, 'color: red');
      }
      
    })
  }
}

export default new Modules();