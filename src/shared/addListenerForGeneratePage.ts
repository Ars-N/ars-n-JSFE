import {
  deleteCar,
  deleteWinner,
} from '../libs/api';
import { MainBody } from '../components/Garage/main-body/main-body';

export class Listeners {
  private garage;

  constructor(garage:HTMLElement) {
    this.garage = garage;
  }

  updateGaragePage() {
    document.querySelector('.garage__body').remove();
    document.querySelector('main').appendChild(new MainBody().element);

    this.addListenerForGeneratePage();
  }

  addListenerRemoveBtn() {
    document.querySelectorAll('.remove').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const id = +(event.target as HTMLElement).parentElement.getAttribute('data-id');
        deleteCar(id).then((isOk) => {
          if (isOk) {
            this.updateGaragePage();
            deleteWinner(id).then();
          }
        });
      });
    });
  }

  addListenerSelectBtn() {
    document.querySelectorAll('.select').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        document.querySelectorAll('.update').forEach((element) => {
          if (element.classList.contains('input-text')) {
            const inputText = element as HTMLInputElement;

            inputText.removeAttribute('disabled');
            inputText.value = (event.target as HTMLElement).parentElement.getAttribute('data-name');
          }

          if (element.classList.contains('input-color')) {
            const inputColor = element as HTMLInputElement;

            element.removeAttribute('disabled');
            inputColor.value = (event.target as HTMLElement).parentElement.getAttribute('data-color');
          }

          if (element.classList.contains('button')) {
            const button = element as HTMLButtonElement;

            element.removeAttribute('disabled');
            button.dataset.id = (event.target as HTMLElement).parentElement.getAttribute('data-id');
          }
        });
      });
    });
  }

  addListenerForGeneratePage() {
    setTimeout(() => {
      this.addListenerRemoveBtn();
      this.addListenerSelectBtn();
    }, 500);
  }
}
