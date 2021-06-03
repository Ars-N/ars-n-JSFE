import './header_btn.scss';
import { Button } from '../../button';
import { Main } from '../../main/main';
import { removeMain } from '../../../shared/remove-main';
import { PopUpBg } from '../../About/Pop-Up/pop-up-background';
import { addImgValidStatus } from '../../../utils/addImgValidStatus';
import { logIn } from '../../../utils/logIn';
import { IndexedDb } from '../../../utils/DB';
import { addNavListener } from './addNavListener';

export class HeaderBtn extends Button {
  constructor() {
    super({ text: 'register new player' }, ['header_btn']);
    this.addClick();
    logIn();
    const db = new IndexedDb();
    db.getUser().then(() => {
      const $body = document.querySelector('body') as HTMLElement;
      addNavListener($body, 'about');
      addNavListener($body, 'score');
      addNavListener($body, 'settings');
    });
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
        const navElements = document.querySelectorAll('.header__nav_link');

        navElements.forEach((navElement) => {
          if (navElement.classList.contains('active')) navElement.classList.remove('active');
        });
        $body.appendChild($main);
        main.addGamePage();
      } else//
      //         \\\ callPopUp ///
      if (($textBtnHeader.textContent as string).toUpperCase() === 'register new player'.toUpperCase()) {
        const $popUp = new PopUpBg().element as HTMLElement;
        $body.appendChild($popUp);
        $body.style.overflow = 'hidden';
      } else//
      //       \\\ to About Page ////
      if (($textBtnHeader.textContent as string).toUpperCase() === 'Stop game'.toUpperCase()) {
        (document.querySelector('.header__nav_link.about') as HTMLElement).click();
        $textBtnHeader.textContent = 'Start game';
      }
      // add Valid Status on inputs PopUp
      addImgValidStatus();
    });
  }
}
