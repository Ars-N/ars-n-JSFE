import './line-create.scss';
import { BaseComponent } from '../../../../utils/baseComponent';
import { Input } from '../../../../utils/input';
import { Button } from '../../../../utils/button';

export class LineCreate extends BaseComponent {
  constructor() {
    super('div', ['line-create']);
    const btn = new Button('create').element;
    btn.classList.add('btnCreate');
    this.element.appendChild(new Input('text').element);
    this.element.appendChild(new Input('color').element);
    this.element.appendChild(btn);
  }
}
