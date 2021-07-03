import './garage.scss';
import { BaseComponent } from '../../utils/baseComponent';
import { MainControl } from '../../components/Garage/main-control/main-control';
import { MainBody } from '../../components/Garage/main-body/main-body';
import { Listeners } from '../../shared/addListenerForGeneratePage';
import {
  createCar,
  createWinner,
  driveModeEngine,
  getWinner,
  switchEngine,
  updateCar,
  updateWinner,
} from '../../libs/api';
import { stopCarAnimation } from '../../shared/stopCar';
import { enableChangeCar, enableNodeList } from '../../shared/enableBtn';
import { randomName } from '../../components/Garage/main-body/race-line/carName';
import { disableChangeCar, disableNodeList } from '../../shared/disableBtn';
import { startCar } from '../../shared/startCar';
import { WinnerLog } from '../../utils/winner-log';

export class Garage extends BaseComponent {
  private listener;

  constructor() {
    super('main', ['garage']);

    this.element.appendChild(new MainControl().element);
    this.element.appendChild(new MainBody().element);

    this.listener = new Listeners(this.element);
    this.listener.addListenerForGeneratePage();

    setTimeout(() => {
      this.addListenerCreateBtn();
      this.addListenerUpdateBtn();
      this.addListenerResetBtn();
      this.addListenerGenerateBtn();
      this.addListenerRaceBtn();
    }, 800);
  }

  addListenerCreateBtn() {
    document.querySelectorAll('.btnCreate').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const carColor = ((event.target as HTMLElement)
          .previousSibling as HTMLInputElement).value;
        const carName = ((event.target as HTMLElement)
          .previousSibling.previousSibling as HTMLInputElement).value;

        if (carName) {
          createCar(carName, carColor).then((response) => {
            if (response.status === 201) {
              this.listener.updateGaragePage();
            }
          });
        }
      });
    });
  }

  addListenerUpdateBtn() {
    document.querySelectorAll('.update').forEach((btn) => {
      btn.addEventListener('click', (event) => {
        const targetBtn = event.target as HTMLElement;

        const newCarColor = (targetBtn.previousSibling as HTMLInputElement).value;
        const newCarName = (targetBtn.previousSibling.previousSibling as HTMLInputElement).value;

        if (newCarName) {
          updateCar((event.target as HTMLElement).getAttribute('data-id'), newCarName, newCarColor).then(async (status) => {
            if (status === 200) {
              this.listener.updateGaragePage();
            }
          });
        }

        (targetBtn.previousSibling as HTMLInputElement).value = '#000000';
        (targetBtn.previousSibling.previousSibling as HTMLInputElement).value = '';

        document.querySelectorAll('.update').forEach((updateLineElement) => {
          updateLineElement.setAttribute('disabled', 'disabled');
        });
      });
    });
  }

  addListenerResetBtn() {
    document.querySelectorAll('.reset').forEach((btn) => {
      btn.setAttribute('disabled', 'disabled');

      btn.addEventListener('click', () => {
        btn.setAttribute('disabled', 'disabled');

        document.querySelectorAll('.race-line').forEach(async (raceLine) => {
          await switchEngine(raceLine.getAttribute('data-id'), 'stopped').then(() => {
            const line = raceLine as HTMLElement;
            line.dataset.status = 'stopped';
            raceLine.removeAttribute('data-time');

            document.querySelectorAll('.svg-car_wrapper').forEach(($svgCar) => {
              stopCarAnimation($svgCar as HTMLElement);
            });

            enableChangeCar();
            document.querySelector('.race').removeAttribute('disabled');
            enableNodeList('#start');
            enableNodeList('#stop');
          });
        });
      });
    });
  }

  addListenerGenerateBtn() {
    document.querySelectorAll('.btnGenerate').forEach((btn) => {
      btn.addEventListener('click', () => {
        const maxColorValue = 0xffffff;
        const carName = randomName();
        let randomColor;
        carName.forEach((name, i) => {
          randomColor = `#${Math.floor(Math.random() * maxColorValue).toString(16)}`;
          createCar(name, randomColor).then((isOk) => {
            if (isOk && (i === 9)) {
              this.listener.updateGaragePage();
            }
          });
        });
      });
    });
  }

  addListenerRaceBtn() {
    let winner:string[] = [];
    document.querySelectorAll('.race').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.setAttribute('disabled', 'disabled');

        document.querySelectorAll('.race-line').forEach((raceLine, i, arr) => {
          switchEngine(raceLine.getAttribute('data-id'), 'started').then(async (response) => {
            enableNodeList('.reset');
            disableChangeCar();
            disableNodeList('#start');
            disableNodeList('#stop');

            if (response.ok) {
              const line = raceLine as HTMLElement;
              line.dataset.status = 'started';

              const result = await response.json();
              line.dataset.time = String(result.distance
                  * result.velocity * 0.0000001);

              const startedList = document.querySelectorAll('[data-status=started]');
              if (startedList.length === arr.length) {
                startedList.forEach((startedLine) => {
                  const $svgCar = startedLine.querySelector('.svg-car_wrapper') as HTMLElement;
                  const carId = startedLine.getAttribute('data-id');

                  startCar(+startedLine.getAttribute('data-time'), $svgCar);
                  driveModeEngine(carId).then((status) => {
                    if (status === 'Internal Server Error') {
                      $svgCar.style.animationPlayState = 'paused';
                      $svgCar.firstElementChild.classList.remove('car-trtrtr');
                    }
                  });

                  $svgCar.addEventListener('animationend', () => {
                    $svgCar.firstElementChild.classList.remove('car-trtrtr');

                    winner.push(carId);

                    if (carId === winner[0]) {
                      const $winnerLog = new WinnerLog(
                        startedLine.getAttribute('data-name'),
                        startedLine.getAttribute('data-time'),
                      );
                      if (winner.length === 1) {
                        const time = startedLine.getAttribute('data-time');

                        document.querySelector('.garage__body').appendChild($winnerLog.element);

                        getWinner(+carId).then((res) => {
                          if (res.ok) {
                            if (res.data.time > time) {
                              updateWinner(carId, res.data.wins + 1, time);
                            } else {
                              updateWinner(carId, res.data.wins + 1, res.data.time);
                            }
                          } else createWinner(+carId, 1, +startedLine.getAttribute('data-time'));
                        });
                      }
                    }
                  });
                  winner = [];
                });
              }
            }
          });
        });
      });
    });
  }
}
