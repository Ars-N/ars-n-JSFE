import { BaseComponent } from '../../../utils/baseComponent';
import { RaceLine } from './race-line';
import { getCars } from '../../../libs/api';
import { Button } from '../../../utils/button';

export class MainBody extends BaseComponent {
  private garagePageNum: number;

  private garageTotalNum: string;

  constructor() {
    super('section', ['garage__body']);
    setTimeout(() => {
      const numberPage = document.querySelector('.garage').hasAttribute('data-page');
      if (numberPage) {
        this.garagePageNum = +document.querySelector('.garage').getAttribute('data-page');
      } else this.garagePageNum = 1;
      this.cratePage();
    }, 0);
  }

  private cratePage() {
    getCars(this.garagePageNum, 7).then((response) => {
      this.garageTotalNum = response.count;
      this.element.insertAdjacentHTML('afterbegin',
        `<h2 class="garage_title">Garage (${response.count})</h2>`);

      this.element.insertAdjacentHTML('beforeend',
        `<div class="garage_title">Page #${this.garagePageNum}</div>`);

      response.cars.forEach((car: {
        name: string,
        color: string,
        id: number
      }) => {
        this.element.appendChild(new RaceLine(car).element);
      });

      this.createBtnToPage();
    });
  }

  private createBtnToPage() {
    const prev = new Button('prev').element;
    const next = new Button('next').element;

    if (this.garagePageNum === 1) prev.setAttribute('disabled', 'disabled');
    if (this.garagePageNum === Math.ceil(+this.garageTotalNum / 7)) {
      next.setAttribute('disabled', 'disabled');
    }

    this.element.appendChild(prev);
    this.element.appendChild(next);

    prev.addEventListener('click', () => {
      if (this.garagePageNum > 1) {
        next.removeAttribute('disabled');

        this.garagePageNum -= 1;
        document.querySelector('.garage__body').innerHTML = '';

        (document.querySelector('.garage') as HTMLElement).dataset.page = String(this.garagePageNum);
        this.cratePage();
      }
    });

    next.addEventListener('click', () => {
      if (this.garagePageNum < Math.ceil(+this.garageTotalNum / 7)) {
        prev.removeAttribute('disabled');

        this.garagePageNum += 1;
        document.querySelector('.garage__body').innerHTML = '';

        (document.querySelector('.garage') as HTMLElement).dataset.page = String(this.garagePageNum);
        this.cratePage();
      }
    });
  }
}
