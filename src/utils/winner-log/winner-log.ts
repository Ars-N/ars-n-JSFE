import './winner-log.scss';
import { BaseComponent } from '../baseComponent';

export class WinnerLog extends BaseComponent {
  constructor(car:string, time:string) {
    super('div', ['winner-log']);
    const $text = new BaseComponent('div', ['winner-text']).element as HTMLElement;
    const $button = new BaseComponent('div', ['winner-btn']).element;

    $text.textContent = `Winner ${car} with time ${time}sec`;
    $button.textContent = 'OK';

    this.element.appendChild($text);
    this.element.appendChild($button);

    $button.addEventListener('click', () => {
      this.element.remove();
    });
  }
}
