import './button.scss';
import { BaseComponent } from '../baseComponent';

export class Button extends BaseComponent {
  constructor(text:string) {
    super('button', ['button']);
    // this.winner = [];
    this.element.innerText = text;

    // this.addListener(text);
  }

  // addListener(text:string) {
  // if (text === 'select') {
  //   this.element.addEventListener('click', (event) => {
  //     document.querySelectorAll('.update').forEach((element) => {
  //       if (element.classList.contains('input-text')) {
  //         const input = element as HTMLInputElement;
  //
  //         input.removeAttribute('disabled');
  //         input.value = (event.target as HTMLElement).parentElement.getAttribute('data-name');
  //       }
  //
  //       if (element.classList.contains('input-color')) {
  //         const input = element as HTMLInputElement;
  //
  //         element.removeAttribute('disabled');
  //         input.value = (event.target as HTMLElement).parentElement.getAttribute('data-color');
  //       }
  //
  //       if (element.classList.contains('button')) {
  //         const button = element as HTMLButtonElement;
  //
  //         element.removeAttribute('disabled');
  // button.dataset.id = (event.target as HTMLElement).parentElement.getAttribute('data-id');
  //       }
  //     });
  //   });
  // }

  // if (text === 'race') {
  //
  // }

  // if (text === 'reset') {
  //
  // }

  // if (text === 'generate cars') {
  //
  // }
  // }
}
