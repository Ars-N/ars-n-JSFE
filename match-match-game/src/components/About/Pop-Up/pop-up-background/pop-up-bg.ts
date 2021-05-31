import './pop-up-background.scss';
import { BaseComponent } from '../../../../shared/baseComponent';
import { PopUpBody } from '../pop-up-body';

export class PopUpBg extends BaseComponent {
  constructor() {
    super('div', ['pop-up_background']);
    this.element.appendChild(new PopUpBody().element);
    this.closePopUp();
    // this.addEvent();
  }

  private closePopUp() {
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.element.remove();
        (document.querySelector('body') as HTMLElement).style.overflow = 'auto';
      }
    });
  }
}
