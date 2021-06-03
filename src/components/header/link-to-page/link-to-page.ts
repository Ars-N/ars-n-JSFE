import { BaseComponent } from '../../../shared/baseComponent';

export class LinkToPage extends BaseComponent {
  constructor(className?: string[], icon?: string, text?: string) {
    super('div', className);
    this.element.innerHTML = `${icon}<span>${text}<span/>`;
  }
}
