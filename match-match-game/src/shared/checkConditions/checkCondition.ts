export function checkCondition():void {
  setTimeout(() => {
    (document.querySelector('button[type=submit]') as HTMLButtonElement)
      .addEventListener('click', () => {
        document.querySelectorAll('input').forEach((input) => {
          if (!(input.dataset.valid === 'true')) {
            if (input.type === 'text' || input.type === 'email') {
              input.style.backgroundColor = 'darkred';
            } else if (input.type === 'file') {
              (input.parentNode as HTMLElement).style.backgroundColor = 'darkred';
            }
          }
        });
      });
  }, 0);
}
