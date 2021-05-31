import './form-register.scss';
import { BaseComponent } from '../../../../shared/baseComponent';
import { PopUpInputField } from '../pop-up-input-field';
import Avatar from '../../../../assets/Avatar.png';
import { PopUpInput } from '../pop-up-input';
import { submitDisableToggle } from '../../../../shared/disableBtnSubmit';
import { checkCondition } from '../../../../shared/checkConditions/checkCondition';

export class FormRegister extends BaseComponent {
  constructor() {
    super('form', ['pop-up_form']);
    this.element.setAttribute('action', '#');
    this.element.setAttribute('method', 'post');
    this.element.setAttribute('id', 'form');
    this.element.setAttribute('enctype', 'multipart/form-data');

    const $PopUpBodyLeft = new BaseComponent('div', ['pop-up_left-body']).element;
    $PopUpBodyLeft.appendChild(new PopUpInputField('text', 'First Name').element);
    $PopUpBodyLeft.appendChild(new PopUpInputField('text', 'Last Name').element);
    $PopUpBodyLeft.appendChild(new PopUpInputField('email', 'E-mail').element);

    // create wrapper - $PopUpBody
    const $PopUpBody = new BaseComponent('div', ['pop-up_body']).element;
    // add inputs
    $PopUpBody.appendChild($PopUpBodyLeft);

    const $inputFileAvatar = new PopUpInput('file', 'avatar', 'avatarInput').element;

    $PopUpBody.insertAdjacentHTML('beforeend',
      `<label id="imgInputFile"><img width="198" height="198" src="${Avatar}" alt="img"></label>`);
    const $labelInputFile = $PopUpBody.querySelector('label#imgInputFile') as HTMLElement;
    $labelInputFile.appendChild($inputFileAvatar);

    $labelInputFile.insertAdjacentHTML('beforeend',
      `<svg id="plusHover" width="97" height="97" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M96.625 55.375H55.375V96.625H41.625V55.375H0.375V41.625H41.625V0
        .375H55.375V41.625H96.625V55.375Z" fill="white"/></svg>`);

    this.element.appendChild($PopUpBody);

    // //////////////////////////\\\\\\\\\\\\\\\\\\\\
    // this.checkFillAllInputs();
    submitDisableToggle();

    // if buttonSubmit clicked and notValid inputs
    // TODO ВЫНЕСТИ КАК ОТДЕЛЬНУЮ ФУНКЦИЮ И ВЫЗЫВАТЬ В ONINPUT И ТУТ
    checkCondition();
  }
}
