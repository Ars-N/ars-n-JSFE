// import { EventProvider, Router } from './libs';
//
// class Application {
//   container: HTMLElement;
//
//   eventProvider: EventProvider;
//
//   router: Router;
//
//   constructor(container: HTMLElement, eventProvider: EventProvider, router: Router) {
//     this.container = container;
//     this.eventProvider = eventProvider;
//     this.router = router;
//   }
//
//   init() {
//     this.router.onRoutePatternMatched = this.onRoutePatternMatched.bind(this);
//     this.eventProvider.addEventListener('page-load', this.onPageLoad);
//   }
//
//   onRoutePatternMatched(target: string) {
//     this.renderPage(target);
//   }
//
//   onPageLoad(page: string) {
//     console.log(`${page} is loaded`);
//   }
//
//   renderPage(target: string) {
//     const page = `
//       <div>
//         <h2>${target}</h2>
//         <ul>
//           <li><a href="/#/">About</a></li>
//           <li><a href="/#/score">Score</a></li>
//           <li><a href="/#/settings">Settings</a></li>
//           <li><a href="/#/game">Game</a></li>
//         </ul>
//       </div>`;
//
//     this.container.innerHTML = '';
//     this.container.insertAdjacentHTML('beforeend', page);
//     this.eventProvider.dispatchEvent('page-load', target);
//   }
// }
//
// export default Application;
