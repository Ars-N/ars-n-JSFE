import './score.scss';
import { BaseComponent } from '../../shared/baseComponent';
import Stat from '../../interfaces/stat';
import { IndexedDb } from '../../utils/DB';

export class Score extends BaseComponent {
  constructor() {
    super('div', ['score']);
    this.addTitle();
    this.addList().then();
  }

  private addTitle() {
    const $title = new BaseComponent('h2', ['title']).element as HTMLHeadingElement;
    $title.innerText = 'Best players';
    this.element.appendChild($title);
  }

  private addList():Promise<void> {
    return new Promise<void>(() => {
      const db = new IndexedDb();
      db.getScore().then((listScore) => {
        listScore.reverse().forEach((user) => {
          this.addUserField(user);
        });
      });
    });
  }

  private addUserField = (user: Stat) => {
    const $userFiled = new BaseComponent('div', ['user-field']).element;
    // container
    const $userContainer = new BaseComponent('div', ['user-container']).element;

    // render img
    const $img = new BaseComponent('div', ['user-field_img-wrapper']).element;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        $img.insertAdjacentHTML('beforeend',
          `<img style="border-radius: 50%" src="${reader.result}" alt="">`);
      }
    };
    reader.readAsDataURL(user.img);

    const $textContainer = new BaseComponent('div', ['user-text_container']).element;
    const $name = new BaseComponent('span', ['user-name']).element;
    $name.innerText = `${user.firstName} ${user.lastName}`;

    const $userEmail = new BaseComponent('span', ['user-email']).element;
    $userEmail.innerText = `${user.email}`;
    $textContainer.appendChild($name);
    $textContainer.appendChild($userEmail);

    $userContainer.appendChild($img);
    $userContainer.appendChild($textContainer);

    const $textScore = new BaseComponent('div', ['user_text-score']).element;
    $textScore.insertAdjacentHTML('beforeend',
      `Score: <span class="score-result">${user.result}</span>`);

    $userFiled.appendChild($userContainer);
    $userFiled.appendChild($textScore);

    const $list = new BaseComponent('div', ['list-score']).element;
    $list.appendChild($userFiled);
    this.element.appendChild($list);
  };
}
