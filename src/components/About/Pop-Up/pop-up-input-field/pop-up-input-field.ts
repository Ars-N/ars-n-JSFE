import './pop-up-input-field.scss';
import { BaseComponent } from '../../../../shared/baseComponent';
import { PopUpInputTitle } from '../pop-up-input-title';
import { PopUpInput } from '../pop-up-input';

export class PopUpInputField extends BaseComponent {
  constructor(inputType: string, inputTitle:string) {
    super('label', ['about__pop-up_input-field']);
    const $inputFieldLeft = new BaseComponent('div', ['inputLeft']).element;
    $inputFieldLeft.appendChild(new PopUpInputTitle(inputTitle).element);
    $inputFieldLeft.appendChild(new PopUpInput(inputType, inputTitle.trim()).element);
    this.element.appendChild($inputFieldLeft);
  }
}
