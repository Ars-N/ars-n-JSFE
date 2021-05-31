import './card.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class Card extends BaseComponent {
  readonly card: HTMLElement;

  public isFlipped = false;

  constructor(readonly imgUrl:string) {
    super('div', ['card-container']);
    this.element.insertAdjacentHTML('beforeend', `
      <div class="card">
        <div class="card__front">
          <img style="width: 160px; height: 160px;" src="./images/${imgUrl}" alt="">
        </div>
        <div class="card__back"></div>
      </div>
    `);
    this.card = this.element.querySelector('.card') || document.createElement('div');
    this.card.classList.toggle('flip');
  }

  public flipCard = (isFront = false): Promise<unknown> => new Promise((resolve) => {
    if (this.element.classList.contains('right')) return;
    this.isFlipped = !this.isFlipped;
    this.card.classList.toggle('flip');
    this.element.addEventListener('transitionend',
      () => resolve(this.card.classList.toggle('flip', isFront)), { once: true });
  });
}
