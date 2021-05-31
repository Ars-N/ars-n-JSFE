import './title.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class Title extends BaseComponent {
  constructor() {
    super('h1', ['about__title', 'title']);
    this.element.innerText = 'How to play?';
  }
}
