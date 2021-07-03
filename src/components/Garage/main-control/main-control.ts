import './main-control.scss';
import { BaseComponent } from '../../../utils/baseComponent';
import { LineCreate } from './line-create';
import { LineUpdate } from './line-update';
import { LinePlay } from './line-play/line-play';

export class MainControl extends BaseComponent {
  constructor() {
    super('section', ['main-control']);
    const lineUpdate = new LineUpdate().element;

    lineUpdate.childNodes.forEach((element) => {
      (element as HTMLInputElement|HTMLButtonElement).setAttribute('disabled', 'disabled');
      (element as HTMLInputElement|HTMLButtonElement).classList.add('update');
    });

    this.element.appendChild(new LineCreate().element);
    this.element.appendChild(lineUpdate);
    this.element.appendChild(new LinePlay().element);
  }
}
