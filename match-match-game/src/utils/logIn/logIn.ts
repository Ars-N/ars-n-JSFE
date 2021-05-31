import { Button } from '../../components/button';
import { IndexedDb } from '../DB';

export function logIn(): Promise<void> {
  return new Promise(() => {
    const db = new IndexedDb();
    db.getUser().then((user) => {
      const $btnHeader = document.querySelector('.header_btn') as HTMLButtonElement;
      ($btnHeader.querySelector('.mdc-button__label') as HTMLSpanElement).innerHTML = 'start game';
      const $btnReLog = new Button({ text: 'reLog' }, ['reLog_btn']).element;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          $btnHeader.insertAdjacentHTML('beforeend',
            `
              <img style="height: 50px; width: 50px; border-radius: 50%" src="${reader.result}" alt="">`);
          $btnHeader.appendChild($btnReLog);
        }
        $btnReLog.addEventListener('click', () => {
          ($btnHeader.querySelector('.mdc-button__label') as HTMLSpanElement).innerHTML = 'register new player';
          ($btnHeader.lastChild as HTMLElement).remove();
          ($btnHeader.lastChild as HTMLElement).remove();
          db.deleteGamer(user.id);
          (document.querySelector('.header__nav_link.about') as HTMLElement).click();
        });
      };
      reader.readAsDataURL(user.img);
    });
  });
}
