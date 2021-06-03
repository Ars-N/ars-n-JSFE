import './field-instruction.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { NumberInstruction } from '../number-instruction';
import { TextInstruction } from '../text-instruction';

export class FieldInstruction extends BaseComponent {
  constructor(number:string, text:string) {
    super('div', ['about__field-instruction']);
    this.addField(number, text);
  }

  private addField(number:string, text:string) {
    this.addChildNode(new NumberInstruction(number).element);
    this.addChildNode(new TextInstruction(text).element);
  }

  private addChildNode(node:HTMLElement) {
    this.element.appendChild(node);
  }
}
