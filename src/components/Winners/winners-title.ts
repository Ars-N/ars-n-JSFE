import { BaseComponent } from '../../utils/baseComponent';

export class WinnersTitle extends BaseComponent {
  constructor(winnersCount:string) {
    super('h2', ['winners-title']);
    this.element.innerText = `Winners (${winnersCount})`;
  }
}
