import './style.scss';
import { App } from './app';
import './interfaces';

window.onload = () => new App(document.querySelector('body') as HTMLBodyElement);
// const appElement = document.querySelector('body');
// if (appElement) {
//   const app = new App(appElement);
// }

// /* added after meting */
// import { EventProvider, Router } from './libs';
// import Application from './application';
// import './index.scss';
//
// const container = document.getElementById('root');
// const eventProvider = new EventProvider();
//
// const routingConfig = [
//   {
//     pattern: /score/,
//     target: 'score',
//   },
//   {
//     pattern: /settings/,
//     target: 'settings',
//   },
//   {
//     pattern: /game/,
//     target: 'game',
//   },
//   {
//     pattern: '',
//     target: 'about',
//   },
// ];
//
// const router = new Router(routingConfig);
// const application = new Application(container, eventProvider, router);
//
// application.init();
