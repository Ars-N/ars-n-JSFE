import './header_btn.scss';
import { Button } from '../../button';
import { Main } from '../../main/main';
import { removeMain } from '../../../shared/remove-main';
import { PopUpBg } from '../../About/Pop-Up/pop-up-background';
import { addImgValidStatus } from '../../../utils/addImgValidStatus';
import { logIn } from '../../../utils/logIn';

export class HeaderBtn extends Button {
  constructor() {
    super({ text: 'register new player' }, ['header_btn']);
    this.addClick();
    logIn().then();
  }

  private addClick() {
    (this.element.querySelector('button') as HTMLButtonElement).addEventListener('click', () => {
      const $textBtnHeader = this.element.querySelector('.mdc-button__label') as HTMLElement;
      const $body = document.querySelector('body') as HTMLElement;
      //       \\\ toGamePage ///
      if (($textBtnHeader.textContent as string).toUpperCase() === 'Start game'.toUpperCase()) {
        $textBtnHeader.textContent = 'Stop game';
        removeMain();
        const main = new Main();
        const $main = main.element;
        $body.appendChild($main);
        main.addGamePage();
      } else//
      // \\\ callPopUp ///
      if (($textBtnHeader.textContent as string).toUpperCase() === 'register new player'.toUpperCase()) {
        const $popUp = new PopUpBg().element as HTMLElement;
        $body.appendChild($popUp);
        $body.style.overflow = 'hidden';
      } else//
      // to About Page
      if (($textBtnHeader.textContent as string).toUpperCase() === 'Stop game'.toUpperCase()) {
        (document.querySelector('.header__nav_link.about') as HTMLElement).click();
        $textBtnHeader.textContent = 'Start game';
      }
      // add Valid Status on inputs PopUp
      addImgValidStatus();
    });
  }
}
