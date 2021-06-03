import './logo.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class Logo extends BaseComponent {
  constructor() {
    super('div', ['header__logo']);
    const logoTop: BaseComponent = new BaseComponent('a', ['header__logo_top']);
    const logoBot: BaseComponent = new BaseComponent('a', ['header__logo_bot']);
    this.element.appendChild(logoTop.element).innerText = 'match';
    this.element.appendChild(logoBot.element).innerText = 'match';
  }
}
