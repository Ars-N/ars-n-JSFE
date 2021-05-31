export function submitDisableToggle(Submit = true):void {
  setTimeout(() => {
    const $buttonSubmit = document.querySelector('[type=submit]') as HTMLButtonElement;
    if (Submit) $buttonSubmit.removeAttribute('form');
    else $buttonSubmit.setAttribute('form', 'form');
  }, 0);
}
