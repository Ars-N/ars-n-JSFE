import './winner-log.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { Main } from '../../main/main';
import { removeMain } from '../../../shared/remove-main';

export class WinnerLog extends BaseComponent {
  constructor(min:string, sec:string) {
    super('div', ['winner-log']);
    const $text = new BaseComponent('div', ['winner-text']).element as HTMLElement;
    const $button = new BaseComponent('div', ['winner-btn']).element;

    $text.textContent = `Congratulations! You successfully found all matches on ${min}:${sec} minutes.`;
    $button.textContent = 'OK';

    this.element.appendChild($text);
    this.element.appendChild($button);

    $button.addEventListener('click', () => {
      removeMain();
      const main = new Main();
      main.addScorePage();
      (document.querySelector('body') as HTMLElement).appendChild(main.element);
      // lint ?
      // (document.querySelector('.header__nav_link.score') as HTMLElement).click();
    });
  }
}
