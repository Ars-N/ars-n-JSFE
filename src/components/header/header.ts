import { BaseComponent } from '../../utils/baseComponent';
import { Button } from '../../utils/button';
import { Winners } from '../../pages/Winners/winners';

export class Header extends BaseComponent {
  private winners: Winners;

  constructor(winners: Winners) {
    super('header', ['header']);
    const $buttonToGarage = new Button('to garage').element;

    this.winners = winners;
    this.element.appendChild($buttonToGarage);

    const $buttonToWinners = new Button('to winners').element;
    this.element.appendChild($buttonToWinners);

    this.addListener($buttonToGarage, 'garage', 'winners');
    this.addListener($buttonToWinners, 'winners', 'garage');
  }

  addListener(buttonActive:HTMLElement, classNameActive:string, classNameNone:string) {
    buttonActive.addEventListener('click', () => {
      (document.querySelector(`.${classNameNone}`) as HTMLElement).style.display = 'none';
      (document.querySelector(`.${classNameActive}`) as HTMLElement).style.cssText = 'block';

      if (classNameActive === 'winners') {
        document.querySelector('.winners').innerHTML = '';
        this.winners.createWinners(this.winners.winnersPageNum, 'wins', 'ASC');
      }
    });
  }
}
