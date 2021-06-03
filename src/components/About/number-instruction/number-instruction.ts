import './number-instruction.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class NumberInstruction extends BaseComponent {
  constructor(number: string) {
    super('div', ['about__number-instruction']);
    this.element.innerText = number;
  }
}
