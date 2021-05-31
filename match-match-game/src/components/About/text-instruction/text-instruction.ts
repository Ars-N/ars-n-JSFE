import './text-instruction.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class TextInstruction extends BaseComponent {
  constructor(text: string) {
    super('p', ['about__field-instruction_text']);
    this.element.innerText = text;
  }
}
