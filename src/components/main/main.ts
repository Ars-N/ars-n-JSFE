import './main.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { MainField } from '../main-field';
import { Game } from '../Game/game';
import ImageCategory from '../../interfaces/image-category';
import { About } from '../About/about';
import { Score } from '../Score';
import { Settings } from '../Settings';
import { IndexedDb } from '../../utils/DB';

export class Main extends BaseComponent {
  constructor() {
    super('main', ['main']);
  }

  private clearMain() {
    this.element.innerHTML = '';
  }

  public addGamePage():void {
    this.clearMain();
    document.location.hash = 'game';

    const $mainField = new MainField().element;
    this.element.appendChild($mainField);

    const db = new IndexedDb();
    let category = '';
    let difficulty = '';

    db.getUser().then((user) => {
      category = user.cardsCollection;
      difficulty = user.difficulty;
    });

    setTimeout(async () => {
      const $game = new Game();
      $mainField.appendChild($game.element);

      // call generate new cards in class Game
      const res = await fetch('./images.json');
      const categories: ImageCategory[] = await res.json();

      await categories.forEach((cat, index) => {
        if (cat.category === category) {
          const images = categories[index].images.map((name) => `${category}/${name}`);

          $game.newGame(images, difficulty);
        }
      });
    }, 0);
  }

  public addAboutPage():void {
    this.clearMain();
    document.location.hash = 'about';

    const $mainField = new MainField().element;
    this.element.appendChild($mainField);

    const $about = new About().element;
    $mainField.appendChild($about);

    const $textBtnHeader = document.querySelector('.mdc-button__label') as HTMLElement;
    if ($textBtnHeader) if ($textBtnHeader.textContent === 'Stop game') $textBtnHeader.textContent = 'Start game';
  }

  public addScorePage():void {
    this.clearMain();
    document.location.hash = 'score';

    const $mainField = new MainField().element;
    this.element.appendChild($mainField);

    const $score = new Score().element;
    $mainField.appendChild($score);

    const $textBtnHeader = document.querySelector('.mdc-button__label') as HTMLElement;
    if ($textBtnHeader.textContent === 'Stop game') $textBtnHeader.textContent = 'Start game';
  }

  public addSettingPage():void {
    this.clearMain();
    document.location.hash = 'setting';

    const $setting = new Settings().element;
    this.element.appendChild($setting);

    const $textBtnHeader = document.querySelector('.mdc-button__label') as HTMLElement;
    if ($textBtnHeader.textContent === 'Stop game') $textBtnHeader.textContent = 'Start game';
  }
}
