import {
  Database,
  EventProvider,
  Router,
  Storage,
} from './libs';
import { Header } from './components/header/header';
import { Garage } from './pages/Garage/garage';
import { Winners } from './pages/Winners/winners';

class Application {
  container: HTMLElement;

  database: Database;

  eventProvider: EventProvider;

  router: Router;

  storage: Storage;

  constructor(
    container: HTMLElement,
    database: Database,
    eventProvider: EventProvider,
    router: Router,
    storage: Storage,
  ) {
    this.container = container;
    this.database = database;
    this.eventProvider = eventProvider;
    this.router = router;
    this.storage = storage;
  }

  init() {
    this.router.onRoutePatternMatched = this.onRoutePatternMatched.bind(this);
    // this.eventProvider.addEventListener('render-complete', this.onRenderComplete);
  }

  onRoutePatternMatched(target: string) {
    this.render(target);
  }

  render(target: string) {
    this.container.innerHTML = '';
    //
    const winners = new Winners();
    this.container.appendChild(new Header(winners).element);
    this.container.appendChild(new Garage().element);
    this.container.appendChild(winners.element);
    //
    this.eventProvider.dispatchEvent('render-complete', target);
  }
}

export default Application;
