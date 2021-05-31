import './button.scss';
import { BaseComponent } from '../../shared/baseComponent';

export class Button extends BaseComponent {
  constructor(data: { icon?: string, text?: string }, className?: string[], isBtnText?:boolean) {
    super('div', className);
    const container = document.createElement('div');

    container.insertAdjacentHTML('beforeend', this.createHTMLString(data, isBtnText));
    this.element.appendChild(container);
  }

  private createHTMLString = ({ icon, text }: { icon?: string, text?: string }, isBtnText?:boolean) : string => (
    isBtnText ? `
      <button class="mdc-button mdc-button--touch">
        <span class="mdc-button__ripple"></span>
        ${icon ? `<i class="material-icons mdc-button__icon" aria-hidden="true">${icon}</i>` : ''}
        ${text ? `<span class="mdc-button__label">${text}</span>` : ''}
        <span class="mdc-button__touch"></span>
      </button>`
      : `
      <button class="mdc-button mdc-button--raised">
        <span class="mdc-button__ripple"></span>
      ${icon ? `<i class="material-icons mdc-button__icon" aria-hidden="true">${icon}</i>` : ''}
      ${text ? `<span class="mdc-button__label">${text}</span>` : ''}
      </button>`);
}
