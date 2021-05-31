import { BaseComponent } from '../../../../shared/baseComponent';

export class PopUpTitle extends BaseComponent {
  constructor() {
    super('h2', ['title']);
    this.element.style.marginBottom = '53px';
    this.element.innerText = 'Register new Player';
  }
}
