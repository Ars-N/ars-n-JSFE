import './input-title.scss';
import { BaseComponent } from '../../../../shared/baseComponent';

export class PopUpInputTitle extends BaseComponent {
  constructor(text:string) {
    super('h3', ['input-title']);
    this.element.innerText = text;
  }
}
