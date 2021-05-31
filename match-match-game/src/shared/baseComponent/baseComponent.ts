export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tagName: keyof HTMLElementTagNameMap = 'div', classNames: string[] = []) {
    this.element = document.createElement(tagName);
    this.element.classList.add(...classNames);
  }
}
