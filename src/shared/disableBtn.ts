export function disableNodeList(selector:string) {
  document.querySelectorAll(selector).forEach((element) => {
    (element as HTMLElement).setAttribute('disabled', 'disabled');
  });
}
export function disableChangeCar() {
  disableNodeList('.remove');
  disableNodeList('.select');
  document.querySelector('.btnCreate').setAttribute('disabled', 'disabled');
  document.querySelector('.btnGenerate').setAttribute('disabled', 'disabled');
}
