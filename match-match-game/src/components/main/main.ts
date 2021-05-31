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
    // todo add rout
    // this.addAboutPage();
    // this.addScorePage();
    this.addSettingPage();
  }

  private clearMain() {
    this.element.innerHTML = '';
  }

  public async addGamePage():Promise<void> {
    return new Promise(() => {
      this.clearMain();
      const $mainField = new MainField().element;
      this.element.appendChild($mainField);
      //
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
        categories.forEach((cat, index) => {
          if (cat.category === category) {
            const images = categories[index].images.map((name) => `${category}/${name}`);
            $game.newGame(images, difficulty);
          }
        });
      }, 0);
    });
  }

  public addAboutPage():void {
    this.clearMain();
    const $mainField = new MainField().element;
    this.element.appendChild($mainField);
    const $about = new About().element;
    $mainField.appendChild($about);
  }

  public addScorePage():void {
    this.clearMain();
    const $mainField = new MainField().element;
    this.element.appendChild($mainField);
    const $score = new Score().element;
    $mainField.appendChild($score);
  }

  public addSettingPage():void {
    this.clearMain();
    const $setting = new Settings().element;
    this.element.appendChild($setting);
  }
}
