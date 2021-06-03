import './time-field.scss';
import { BaseComponent } from '../../../shared/baseComponent';

export class TimeField extends BaseComponent {
  private time: number;

  public timeMin: number;

  public timeSec: number;

  private interval: NodeJS.Timeout | undefined;

  constructor() {
    super('div', ['time-field']);
    this.time = 0;
    this.timeMin = 0;
    this.timeSec = 0;
  }

  public timer(stopInterval: boolean):void {
    this.element.innerHTML = '00:00';
    if (!stopInterval) {
      setTimeout(() => {
        const timeStart = new Date();
        this.interval = setInterval(() => {
          let sec:string;
          let min:string;
          if (+this.timeCalc(timeStart) % 60 > 9) {
            sec = `${+this.timeCalc(timeStart) % 60}`;
            this.timeSec = +sec;
          } else {
            sec = `0${Math.floor(+this.timeCalc(timeStart) % 60)}`;
            this.timeSec = +sec;
          }
          if (+this.timeCalc(timeStart) > 599) {
            min = `${Math.floor(+this.timeCalc(timeStart) / 60)}`;
            this.timeMin = +min;
          } else {
            min = `0${Math.floor(+this.timeCalc(timeStart) / 60)}`;
            this.timeMin = +min;
          }
          this.element.innerHTML = `${min}:${sec}`;
          this.time = +this.timeCalc(timeStart) % 60;
        }, 1000);
      }, 30000);
    } else {
      if (this.interval) clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  public getTime():number {
    return this.time;
  }

  private timeCalc = (time: Date) => ((+(new Date()) - +time) / 1000).toFixed(0);
}
