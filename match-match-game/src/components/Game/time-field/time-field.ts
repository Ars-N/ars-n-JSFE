import './time-field.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class TimeField extends BaseComponent {
  private time: number;

  public clearInterval: boolean;

  constructor() {
    super('div', ['time-field']);
    this.time = 0;
    this.clearInterval = false;
  }

  public timer():void {
    const timeStart = new Date();
    this.element.innerHTML = '00:00';
    if (!this.clearInterval) {
      window.setInterval(() => {
        let sec:string;
        let min:string;
        if (+this.timeCalc(timeStart) % 60 > 9) {
          sec = `${+this.timeCalc(timeStart) % 60}`;
        } else sec = `0${Math.floor(+this.timeCalc(timeStart) % 60)}`;
        if (+this.timeCalc(timeStart) > 599) {
          min = `${Math.floor(+this.timeCalc(timeStart) / 60)}`;
        } else min = `0${Math.floor(+this.timeCalc(timeStart) / 60)}`;
        this.element.innerHTML = `${min}:${sec}`;
        this.time = +this.timeCalc(timeStart) % 60;
      }, 1000);
    }
  }

  public getTime():number {
    return this.time;
  }

  private timeCalc = (time: Date) => ((+(new Date()) - +time) / 1000).toFixed(0);
}
