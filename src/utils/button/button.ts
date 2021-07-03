import './button.scss';
import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
  constructor(text:string) {
    super('button', ['button']);
    this.element.innerText = text;
  }
}
