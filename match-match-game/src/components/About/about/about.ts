import { BaseComponent } from '../../../shared/baseComponent';
import { ContainerAbout } from '../container';
import { Title } from '../title/title';
import { FieldInstruction } from '../field-instruction';
import { ImgInstruction } from '../img-instruction';

export class About extends BaseComponent {
  constructor() {
    super('div', ['about']);
    this.element.appendChild(new Title().element);
    this.addContainer('1', 'Register new player in game', './images/aboutPage/imgRegistr.png');
    this.addContainer('2', 'Configure your game settings', './images/aboutPage/imgSetting.png');
    this.addContainer('3',
      'Start you new game! Remember card positions and match it before times up.',
      './images/aboutPage/imgCard.png');
  }

  private addContainer = (number:string, text:string, linkToImg:string) => {
    const $container = new ContainerAbout().element;
    this.element.appendChild($container);
    $container.appendChild(new FieldInstruction(`${number}`, `${text}`).element);
    $container.appendChild(new ImgInstruction(`${linkToImg}`).element);
  };
}
