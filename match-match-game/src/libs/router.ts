// class Router {
//   routes: { pattern: RegExp | string, target: string }[];
//
//   route: string;
//
//   stateChangeTimer: NodeJS.Timeout;
//
//   onRoutePatternMatched: Function;
//
//   constructor(routes: { pattern: RegExp | string, target: string }[]) {
//     this.routes = routes;
//     this.start();
//   }
//
//   /* --------------------------------- Routes --------------------------------- */
//
//   addRoute(pattern: RegExp | string, target: string) {
//     this.routes.push({ pattern, target });
//
//     return this;
//   }
//
//   getRoute() {
//     const match = window.location.href.match(/#(.*)$/);
//     const fragment = match ? match[1] : '';
//
//     return this.regExpToString(fragment);
//   }
//
//   deleteRoute(target: string) {
//     this.routes.forEach((route, i) => {
//       if (route.target === target) {
//         this.routes.slice(i, 1);
//
//         return this;
//       }
//     });
//
//     return this;
//   }
//
//   /* --------------------------- Events / Listeners --------------------------- */
//
//   start() {
//     clearInterval(this.stateChangeTimer);
//
//     this.stateChangeTimer = setInterval(this.stateChangeListener.bind(this), 500);
//   }
//
//   stateChangeListener() {
//     if (this.route === this.getRoute()) {
//       return;
//     }
//
//     this.onStateChange();
//   }
//
//   onStateChange() {
//     this.route = this.getRoute();
//
//     this.routes.some((route) => {
//       const match = this.route.match(route.pattern);
//
//       if (match) {
//         this.onRoutePatternMatched(route.target);
//
//         return true;
//       }
//     });
//   }
//
//   /* -------------------------------- Utilities ------------------------------- */
//
//   regExpToString(pattern: RegExp | string) {
//     return pattern.toString().replace(/\/$/, '').replace(/^\//, '');
//   }
// }
//
// export default Router;
