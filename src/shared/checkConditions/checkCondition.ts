import { BaseComponent } from '../baseComponent';

export function checkCondition():void {
  setTimeout(() => {
    (document.querySelector('button[type=submit]') as HTMLButtonElement)
      .addEventListener('click', () => {
        document.querySelectorAll('input').forEach((input) => {
          if (!(input.dataset.valid === 'true')) {
            if (input.type === 'text' || input.type === 'email') {
              if (input.name === 'First Name') {
                (input.previousSibling as HTMLElement).innerText = 'Имя не может быть пустым, состоять из цифр,'
                  + ' содержать служебные символы, содержать более чем одно слово.';
              } else if (input.name === 'Last Name') {
                (input.previousSibling as HTMLElement).innerText = 'Фамилия не может быть пустой, состоять из цифр,'
                  + ' содержать служебные символы, содержать более чем одно слово.';
              } else (input.previousSibling as HTMLElement).innerText = 'Введите правильный Email';

              (input.previousSibling as HTMLElement).style.color = 'red';
            } else if (input.type === 'file') {
              const $errorLog = new BaseComponent('div', ['error-log']).element as HTMLElement;

              $errorLog.innerText = 'добавьте изображение';
              $errorLog.style.color = '#fff';

              (input.parentNode as HTMLElement).style.backgroundColor = 'darkred';
              if (!((input.parentNode as HTMLElement).lastChild as HTMLDivElement).classList.contains('error-log')) {
                (input.parentNode as HTMLElement).appendChild($errorLog);
              }
            }
          }
        });
      });
  }, 0);
}
