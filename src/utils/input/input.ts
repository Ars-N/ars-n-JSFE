import './input.scss';
import { BaseComponent } from '../baseComponent';

export class Input extends BaseComponent {
  constructor(inputType:string) {
    super('input', [`input-${inputType}`, 'input']);
    (this.element as HTMLInputElement).type = inputType;
    (this.element as HTMLInputElement).name = inputType;

    if (inputType === 'color') (this.element as HTMLInputElement).value = '#fff';
  }
}
