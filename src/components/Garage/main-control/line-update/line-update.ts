import { BaseComponent } from '../../../../utils/baseComponent';
import { Input } from '../../../../utils/input';
import { Button } from '../../../../utils/button';

export class LineUpdate extends BaseComponent {
  constructor() {
    super('div', ['main-update']);

    this.element.appendChild(new Input('text').element);
    this.element.appendChild(new Input('color').element);
    this.element.appendChild(new Button('update').element);
  }
}
