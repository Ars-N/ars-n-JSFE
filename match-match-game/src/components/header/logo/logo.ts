import './logo.scss';
import { BaseComponent } from '../../../shared/baseComponent';
// import { Button } from '../../button';

export class Logo extends BaseComponent {
  constructor() {
    super('div', ['header__logo']);
    const logoTop: BaseComponent = new BaseComponent('a', ['header__logo_top']);
    const logoBot: BaseComponent = new BaseComponent('a', ['header__logo_bot']);
    // const buttonTop: Button = new Button({ text: 'Match' }, ['header__logo_top']);
    // const buttonBot: Button = new Button({ text: 'Match' }, ['header__logo_bot'], true);
    this.element.appendChild(logoTop.element).innerText = 'match';
    this.element.appendChild(logoBot.element).innerText = 'match';
  }
}
