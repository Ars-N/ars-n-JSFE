export function removeMain():void {
  const $main = document.querySelector('.main') as HTMLElement;
  $main.remove();
}
