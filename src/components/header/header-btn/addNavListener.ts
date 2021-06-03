import { removeMain } from '../../../shared/remove-main';
import { Main } from '../../main/main';

export function addNavListener($body:HTMLElement, func: string):void {
  const nav = document.querySelector(`.header__nav_link.${func}`) as HTMLElement;
  const main = new Main();

  nav.addEventListener('click', () => {
    removeMain();
    const navElements = document.querySelectorAll('.header__nav_link');

    navElements.forEach((navElement) => {
      if (navElement.classList.contains('active')) navElement.classList.remove('active');
    });

    nav.classList.add('active');

    if (func === 'about') {
      main.addAboutPage();
    }
    if (func === 'score') {
      main.addScorePage();
    }
    if (func === 'settings') {
      main.addSettingPage();
    }
    $body.appendChild(main.element);
  });
}
