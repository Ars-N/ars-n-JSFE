import './race-line.scss';
import { carSvg, flagSvg } from './svg';
import { BaseComponent } from '../../../../utils/baseComponent';
import { Button } from '../../../../utils/button';
import { driveModeEngine, switchEngine } from '../../../../libs/api';
import { startCar } from '../../../../shared/startCar';
import { stopCarAnimation } from '../../../../shared/stopCar';
import { enableChangeCar, enableNodeList } from '../../../../shared/enableBtn';
import { disableChangeCar, disableNodeList } from '../../../../shared/disableBtn';

export class RaceLine extends BaseComponent {
  constructor(car:{ name: string, color: string, id: number }) {
    super('div', ['race-line']);

    const $btnSelect = new Button('select').element;
    const $btnRemove = new Button('remove').element;

    $btnRemove.classList.add('remove');
    $btnSelect.classList.add('select');

    this.element.dataset.name = car.name;
    this.element.dataset.id = String(car.id);
    this.element.dataset.color = car.color;

    this.element.appendChild($btnSelect);
    this.element.appendChild($btnRemove);
    this.element.insertAdjacentHTML('beforeend',
      `<span>${car.name}</span>`);

    // btn A, btn B
    const $carControl = new BaseComponent('div', ['car-control']).element;
    $carControl.insertAdjacentHTML('beforeend',
      `<button class="start" id="start">A</button>
        <button class="stop" id="stop">B</button>
        <div class="svg-car_wrapper">${carSvg}</div>${flagSvg}`);
    this.element.appendChild($carControl);

    //  svg Car
    ($carControl.querySelector('#carSvg') as SVGAElement).style.fill = car.color;

    ($carControl.querySelector('svg') as SVGSVGElement).id = String(car.id);
    ($carControl.querySelector('svg') as SVGSVGElement).classList.add('car_svg');

    this.btnAListener();
    this.btnBListener();
  }

  btnAListener() {
    this.element.querySelectorAll('.start').forEach((btnStart) => {
      btnStart.addEventListener('click', (event) => {
        this.element.querySelector('.stop').removeAttribute('disabled');

        // disable Btns
        disableChangeCar();
        (event.target as HTMLElement).setAttribute('disabled', 'disabled');
        disableNodeList('.race');
        disableNodeList('.reset');
        // \\\\\\\\\\\\\\\\\\\\\\\\

        switchEngine(this.element.getAttribute('data-id'), 'started')
          .then(async (response) => {
            if (response.ok) {
              const result = await response.json();
              const time = result.distance * result.velocity * 0.0000001;
              const $svgCar = (btnStart as HTMLElement)
                .nextElementSibling.nextElementSibling as HTMLElement;

              startCar(time, $svgCar);
              driveModeEngine(this.element.getAttribute('data-id')).then((status) => {
                if (status === 'Internal Server Error') {
                  $svgCar.style.animationPlayState = 'paused';
                  $svgCar.firstElementChild.classList.remove('car-trtrtr');
                }
              });
            }
          });
      });
    });
  }

  btnBListener() {
    this.element.querySelectorAll('.stop').forEach((btnStop) => {
      btnStop.setAttribute('disabled', 'disabled');

      btnStop.addEventListener('click', (event) => {
        btnStop.setAttribute('disabled', 'disabled');

        switchEngine(this.element.getAttribute('data-id'), 'stopped')
          .then(async (response) => {
            if (response.ok) {
              const $svgCar = (btnStop as HTMLElement)
                .nextElementSibling as HTMLElement;
              stopCarAnimation($svgCar);

              // enable Btns
              ((event.target as HTMLElement).previousSibling.previousSibling as HTMLElement).removeAttribute('disabled');
              const listStart = document.querySelectorAll('.start') as unknown as Array<any>;
              if (![...listStart].some((btnStart) => btnStart.hasAttribute('disabled'))) {
                enableChangeCar();
                enableNodeList('.race');
              }
            }
          });
      });
    });
  }
}
