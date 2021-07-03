import './winners.scss';
import { BaseComponent } from '../../utils/baseComponent';
import { WinnersTitle } from '../../components/Winners/winners-title';
import { WinnersMain } from '../../components/Winners/winners-main';
import { getCar, getWinners } from '../../libs/api';
import { carSvg } from '../../components/Garage/main-body/race-line/svg';
import { Button } from '../../utils/button';

export class Winners extends BaseComponent {
  winnersPageNum: number;

  private winnersTotalNum: number;

  private sortParam: string;

  private order: string;

  private classListArrow: string;

  constructor() {
    super('div', ['winners']);
    this.winnersPageNum = 1;

    this.sortParam ??= 'id';
    this.order ??= 'ASC';

    this.createWinners(this.winnersPageNum, 'id', 'ASC');
  }

  addSortListener() {
    setTimeout(() => {
      const timeArrowTop = this.element.querySelector('.time.arrow-top') as HTMLElement;
      const timeArrowBottom = this.element.querySelector('.time.arrow-bottom') as HTMLElement;
      const winsArrowTop = this.element.querySelector('.wins.arrow-top') as HTMLElement;
      const winsArrowBottom = this.element.querySelector('.wins.arrow-bottom') as HTMLElement;

      this.switchSortTable(winsArrowBottom, winsArrowTop, 'wins');
      this.switchSortTable(timeArrowBottom, timeArrowTop, 'time');
    }, 200);
  }

  createWinners(winnersPageNum:number, sortParam:'time' | 'id' | 'wins', order:'ASC'|'DESC') {
    getWinners(winnersPageNum, sortParam, order).then((winnersList) => {
      this.winnersTotalNum = +winnersList.count;

      if (!(document.querySelector('.winner-main'))) {
        const winnersMain = new WinnersMain(winnersPageNum);

        this.element.appendChild(new WinnersTitle(winnersList.count).element);
        this.element.appendChild(winnersMain.element);
      }

      let newIndex;
      let car;
      let winnersRow;
      winnersList.data.forEach(async (listItem: any, index:number) => {
        car = await getCar(listItem.id);
        winnersRow = document.querySelector('.winners__table_body') as HTMLElement;
        newIndex = index + 1;

        winnersRow.insertAdjacentHTML('beforeend',
          `<div class="winners__table_content">
                  <span class="winners__table-element">${newIndex}</span>
                  <span class="winners__table-element car${car.id}">${carSvg}</span>
                  <span class="winners__table-element">${car.name}</span>
                  <span class="winners__table-element">${listItem.wins}</span>
                  <span class="winners__table-element">${listItem.time}</span>
                </div>`);

        (document.querySelector(`.car${car.id}`) as SVGSVGElement).style.fill = car.color;
        ((document.querySelector(`.car${car.id}`) as SVGSVGElement).firstChild as HTMLElement)
          .style.width = '20px';
      });
      this.addSortListener();
      this.createBtnToPage();
      if (this.classListArrow) {
        (document.querySelector(`.${this.classListArrow}`) as HTMLElement)
          .style.display = 'block';
      }
    });
  }

  private switchSortTable(arrowTop:HTMLElement, arrowBottom:HTMLElement, className:string) {
    document.querySelector(`.winners__table-element.${className}`).addEventListener('click', () => {
      if (arrowTop.style.display === 'block') {
        document.querySelectorAll('.arrow').forEach((arrow) => {
          const arrowElement = arrow as HTMLElement;
          arrowElement.style.display = 'none';
        });
        document.querySelector('.winners').innerHTML = '';
        this.sortParam = className;
        this.order = 'ASC';
        this.classListArrow = arrowBottom.classList.value.split(' ').join('.');

        this.createWinners(this.winnersPageNum, className as 'wins'|'time', 'ASC');
      } else {
        document.querySelectorAll('.arrow').forEach((arrow) => {
          const arrowElement = arrow as HTMLElement;
          arrowElement.style.display = 'none';
        });
        document.querySelector('.winners').innerHTML = '';
        this.sortParam = className;
        this.order = 'DESC';
        this.classListArrow = arrowTop.classList.value.split(' ').join('.');

        this.createWinners(this.winnersPageNum, className as 'wins'|'time', 'DESC');
        // (document.querySelector(`.${className}.arrow`) as HTMLElement).style.display = 'block';
      }
    });
  }

  private createBtnToPage() {
    const totalPageCount = 10;

    const prev = new Button('prev').element;
    const next = new Button('next').element;

    this.element.appendChild(prev);
    this.element.appendChild(next);

    if (this.winnersPageNum === 1) prev.setAttribute('disabled', 'disabled');
    if (this.winnersPageNum === Math.ceil(+this.winnersTotalNum / totalPageCount)) {
      next.setAttribute('disabled', 'disabled');
    }

    prev.addEventListener('click', () => {
      if (this.winnersPageNum > 1) {
        next.removeAttribute('disabled');

        this.winnersPageNum -= 1;
        document.querySelector('.winners').innerHTML = '';

        this.createWinners(this.winnersPageNum, this.sortParam as 'id' | 'wins' | 'time', this.order as 'ASC' | 'DESC');
      }
    });

    next.addEventListener('click', () => {
      if (this.winnersPageNum < Math.ceil(this.winnersTotalNum / 7)) {
        prev.removeAttribute('disabled');

        this.winnersPageNum += 1;
        document.querySelector('.winners').innerHTML = '';

        this.createWinners(this.winnersPageNum, this.sortParam as 'id' | 'wins' | 'time', this.order as 'ASC' | 'DESC');
      }
    });
  }
}
