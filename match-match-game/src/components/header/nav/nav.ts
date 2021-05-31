import './nav.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { LinkToPage } from '../link-to-page';
import { Main } from '../../main/main';
import { removeMain } from '../../../shared/remove-main';

export class Nav extends BaseComponent {
  private readonly linkAboutGame;

  private readonly linkBestScore;

  private readonly linkGameSettings;

  constructor() {
    super('div', ['header__nav']);
    this.linkAboutGame = new LinkToPage(['header__nav_link', 'about', 'active'],
      '<svg xmlns="http://www.w3.org/2000/svg" '
      + 'height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/>'
      + '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-'
      + '.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 '
      + '0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
      'About Game');
    this.linkBestScore = new LinkToPage(['header__nav_link', 'score'],
      '<svg width="24" height="24" style="padding: 2px" viewBox="0 0 20 20" fill="none" '
      + 'xmlns="http://www.w3.org/2000/svg">'
      + '<path  d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 '
      + '15.52 0 9.99 0ZM14.23 16L10 13.45L5.77 16L6.89 11.19L3.16 7.96L8.08 7.54L10 3L11.92 7.53L16.84 '
      + '7.95L13.11 11.18L14.23 16Z" fill="white" fill-opacity="0.7"/></svg>',
      'Best Score');
    this.linkGameSettings = new LinkToPage(['header__nav_link', 'settings'],
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<circle cx="12" cy="12" r="10" fill="white"/>'
      + '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7487 12.624C16.7727 12.424 16.7887 12.216 '
      + '16.7887 12C16.7887 11.784 16.7727 11.576 16.7407 11.376L18.0927 10.32C18.2127 10.224 18.2447 10.048 '
      + '18.1727 9.91201L16.8927 7.69601C16.8127 7.55201 16.6447 7.50401 16.5007 7.55201L14.9087 '
      + '8.19201C14.5727 7.93601 14.2207 7.72801 13.8287 7.56801L13.5887 5.87201C13.5647 5.71201 13.4287 '
      + '5.60001 13.2687 5.60001H10.7087C10.5487 5.60001 10.4207 5.71201 10.3967 5.87201L10.1567 '
      + '7.56801C9.76474 7.72801 9.40474 7.94401 9.07674 8.19201L7.48474 7.55201C7.34074 7.49601 7.17274 '
      + '7.55201 7.09274 7.69601L5.81274 9.91201C5.73274 10.056 5.76474 10.224 5.89274 10.32L7.24474 '
      + '11.376C7.21274 11.576 7.18874 11.792 7.18874 12C7.18874 12.208 7.20474 12.424 7.23674 12.624L5.88474 '
      + '13.68C5.76474 13.776 5.73274 13.952 5.80474 14.088L7.08474 16.304C7.16474 16.448 7.33274 16.496 7.47674 '
      + '16.448L9.06874 15.808C9.40474 16.064 9.75674 16.272 10.1487 16.432L10.3887 18.128C10.4207 18.288 '
      + '10.5487 18.4 10.7087 18.4H13.2687C13.4287 18.4 13.5647 18.288 13.5807 18.128L13.8207 '
      + '16.432C14.2127 16.272 14.5727 16.056 14.9007 15.808L16.4927 16.448C16.6367 16.504 16.8047 16.448 '
      + '16.8847 16.304L18.1647 14.088C18.2447 13.944 18.2127 13.776 18.0847 13.68L16.7487 '
      + '12.624V12.624ZM11.9887 14.4C10.6687 14.4 9.58874 13.32 9.58874 12C9.58874 10.68 '
      + '10.6687 9.60001 11.9887 9.60001C13.3087 9.60001 14.3887 10.68 14.3887 12C14.3887 13.32 '
      + '13.3087 14.4 11.9887 14.4Z" fill="#2F80ED"/></svg>', 'Game Settings');

    this.element.appendChild(this.linkAboutGame.element);
    this.element.appendChild(this.linkBestScore.element);
    this.element.appendChild(this.linkGameSettings.element);

    this.addEventToAbout();
    this.addEventToScore();
    this.addEventToSettings();
  }

  private addEventToAbout = () => {
    this.linkAboutGame.element
      .addEventListener('click', () => {
        removeMain();
        const main = new Main();
        const $body = document.querySelector('body') as HTMLElement;
        $body.appendChild(main.element);
        main.addAboutPage();
      });
  };

  private addEventToScore = () => {
    this.linkBestScore.element
      .addEventListener('click', () => {
        removeMain();
        const main = new Main();
        const $body = document.querySelector('body') as HTMLElement;
        $body.appendChild(main.element);
        main.addScorePage();
      });
  };

  private addEventToSettings = () => {
    this.linkGameSettings.element
      .addEventListener('click', () => {
        removeMain();
        const main = new Main();
        const $body = document.querySelector('body') as HTMLElement;
        $body.appendChild(main.element);
        main.addSettingPage();
      });
  };
}
