// class EventProvider {
//   channels: { [key: string]: Function[] };
//
//   constructor() {
//     this.channels = {};
//   }
//
//   addEventListener(event: string, eventHandler: Function) {
//     if (!this.channels[event]) {
//       this.channels[event] = [];
//     }
//
//     this.channels[event].push(eventHandler);
//   }
//
//   removeEventListener(event: string, eventHandler: Function) {
//     if (!this.channels[event]) {
//       return;
//     }
//
//     this.channels[event] = this.channels[event].filter((handler) => handler !== eventHandler);
//   }
//
//   dispatchEvent(event: string, data?: any) {
//     const channel = this.channels[event];
//
//     if (!channel || !channel.length) {
//       return;
//     }
//
//     channel.forEach((eventHandler) => eventHandler(data));
//   }
// }
//
// export default EventProvider;
