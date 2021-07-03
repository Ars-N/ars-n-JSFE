import './line-play.scss';
import { BaseComponent } from '../../../../utils/baseComponent';
import { Button } from '../../../../utils/button';

export class LinePlay extends BaseComponent {
  constructor() {
    super('div', ['main-control_line-play']);
    const btnGenerate = new Button('generate cars').element;
    const btnRace = new Button('race').element;
    const btnReset = new Button('reset').element;

    btnGenerate.classList.add('btnGenerate');
    btnRace.classList.add('race');
    btnReset.classList.add('reset');

    this.element.appendChild(btnRace);
    this.element.appendChild(btnReset);
    this.element.appendChild(btnGenerate);
  }
}
