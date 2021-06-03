import { BaseComponent } from '../../../shared/baseComponent';

export class ImgInstruction extends BaseComponent {
  constructor(linkToImg:string) {
    super('figure', ['about__img-instruction']);
    this.element.innerHTML = `<img src="${linkToImg}">`;
  }
}
