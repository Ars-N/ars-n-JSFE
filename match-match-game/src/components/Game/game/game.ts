import './game.scss';
import { Card } from '../card';
import { BaseComponent } from '../../../shared/baseComponent';
import { CardField } from '../card-field';
import { delay } from '../../../shared/delay';
import { TimeField } from '../time-field';
import { IndexedDb } from '../../../utils/DB';
import { Stat } from '../../../interfaces';
import { calcGame } from '../../../utils/calcGame/calcGame';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  private readonly cardsField;

  private isAnimation = false;

  private activeCard?: Card;

  private falseComparison?: number;

  private allComparison?: number;

  private readonly $time: TimeField;

  constructor() {
    super('div', ['game']);
    this.$time = new TimeField();
    this.$time.timer();
    this.element.appendChild(this.$time.element);
    this.cardsField = new CardField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[], difficulty: string):void {
    this.cardsField.clear();
    if (difficulty.lastIndexOf('3') === 2) {
      const cards = images.concat(images).concat(images).map((url) => new Card(url))
        .sort(() => Math.random() - 0.5);
      cards.forEach((card) => {
        card.element.addEventListener('click', () => this.cardHandler(card));
        card.element.style.width = '160px';
        card.element.style.height = '160px';
      });

      this.cardsField.addCards(cards);
    } else if (difficulty.indexOf('4') !== difficulty.lastIndexOf('4')) {
      const cards = images.concat(images).concat(images).concat(images).concat(images)
        .map((url) => new Card(url))
        .sort(() => Math.random() - 0.5);
      cards.forEach((card) => {
        card.element.addEventListener('click', () => this.cardHandler(card));
        card.element.style.width = '160px';
        card.element.style.height = '160px';
      });

      this.cardsField.addCards(cards);
    } else if (difficulty.indexOf('5') === 0) {
      const cards = images.concat(images).concat(images).concat(images).concat(images)
        .concat(images)
        .map((url) => new Card(url))
        .sort(() => Math.random() - 0.5);
      cards.forEach((card) => {
        card.element.addEventListener('click', () => this.cardHandler(card));
        card.element.style.width = '160px';
        card.element.style.height = '160px';
      });

      this.cardsField.addCards(cards);
      this.cardsField.element.style.width = '860px';
    }
    this.falseComparison = 0;
    this.allComparison = 0;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipCard(true);
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    // \\count all comparison// \\
    if (this.allComparison) this.allComparison += 1;
    else this.allComparison = 1;

    if (this.activeCard.imgUrl !== card.imgUrl) {
      this.activeCard.element.classList.add('error');
      card.element.classList.add('error');
      await delay(FLIP_DELAY);

      // \\count false comparison// \\
      if (this.falseComparison) this.falseComparison += 1;
      else this.falseComparison = 1;

      await Promise.all(
        [this.activeCard.flipCard(),
          card.flipCard(),
          this.activeCard.element.classList.remove('error'),
          card.element.classList.remove('error')],
      );
    } else {
      this.isAnimation = true;
      this.activeCard.element.classList.add('right');
      card.element.classList.add('right');

      if (![...document.querySelectorAll('.card-container')]
        .some((a) => !(a.classList.contains('right')))) {
        window.clearInterval();
        const db = new IndexedDb();
        const user = await db.getUser();
        const listScore = await db.getScore();
        const userStat: Stat = {
          firstName: user.firstName,
          lastName: user.lastName,
          userId: user.id,
          email: user.email,
          img: user.img,
          result: calcGame(this.allComparison, this.falseComparison as number, this.$time.getTime() as number),
        };
        db.addGameResult(userStat, listScore).then(() => {});
        (document.querySelector('.mdc-button__label') as HTMLElement).textContent = 'Start game';
        (document.querySelector('.header__nav_link.score') as HTMLElement).click();
      }
      //
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
