import './card-field.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { Card } from '../card';

const SHOW_TIME = 2000;

export class CardField extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-field']);
    this.clear();
  }

  public clear():void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards:Card[]):void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipCard());
    }, SHOW_TIME);
  }
}
