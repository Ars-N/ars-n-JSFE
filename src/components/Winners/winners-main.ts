import './winners.scss';
import { BaseComponent } from '../../utils/baseComponent';

export class WinnersMain extends BaseComponent {
  constructor(pageCount:number) {
    super('div', ['winner-main']);
    this.element.insertAdjacentHTML('afterbegin',
      `<div>Page #${pageCount}</div>`);

    this.element.insertAdjacentHTML('beforeend',
      `<div class="winners__table">
                <div class="winners__table-header">
                    <span class="winners__table-header_element winners__table-element">Number</span>
                    <span class="winners__table-header_element winners__table-element">Car</span>
                    <span class="winners__table-header_element winners__table-element">Name</span>
                    <span class="winners__table-header_element winners__table-element wins">Wins
                        <span class="winners__table-header_element wins arrow arrow-top">🠕</span>
                        <span class="winners__table-header_element wins arrow arrow-bottom">🠗</span>
                    </span>
                    <span class="winners__table-header_element winners__table-element time">Best time (sec)
                        <span class="winners__table-header_element time arrow arrow-top">🠕</span>
                        <span class="winners__table-header_element time arrow arrow-bottom">🠗</span>
                    </span>
                </div>
                <div class="winners__table_body"></div>
            </div>`);
  }
}
