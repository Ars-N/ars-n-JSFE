export function enableNodeList(selector:string) {
  document.querySelectorAll(selector).forEach((element) => {
    (element as HTMLElement).removeAttribute('disabled');
  });
}
export function enableChangeCar() {
  enableNodeList('.remove');
  enableNodeList('.select');
  document.querySelector('.btnCreate').removeAttribute('disabled');
  document.querySelector('.btnGenerate').removeAttribute('disabled');
}
