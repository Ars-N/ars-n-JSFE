import './pop-up-body.scss';
import { FormRegister } from '../form-register';
import { PopUpTitle } from '../pop-up-title';
import { BaseComponent } from '../../../../shared/baseComponent';
import { Button } from '../../../button';
import { logIn } from '../../../../utils/logIn';

export class PopUpBody extends BaseComponent {
  constructor() {
    super('div', ['pop-up']);
    this.element.appendChild(new PopUpTitle().element);
    this.element.appendChild(new FormRegister().element);

    // \\ only buttons // \\
    const $buttons = new BaseComponent('div', ['buttons']).element;
    const $buttonSubmit = new Button({ text: 'add user' }, ['submit']).element;
    const $buttonCancel = new Button({ text: 'cancel' }, ['cancel']).element;
    $buttons.appendChild($buttonSubmit);
    $buttons.appendChild($buttonCancel);
    this.element.appendChild($buttons);

    ($buttonSubmit.querySelector('button') as HTMLElement).setAttribute('type', 'submit');
    ($buttonSubmit.querySelector('button') as HTMLElement).setAttribute('form', 'form');
    ($buttonCancel.querySelector('button') as HTMLElement).setAttribute('type', 'reset');

    $buttonCancel.addEventListener('click', () => {
      (document.querySelector('.pop-up_background') as HTMLElement).remove();
      (document.querySelector('body') as HTMLElement).style.overflow = 'auto';
    });

    $buttonSubmit.addEventListener('click', () => logIn());
  }
}
