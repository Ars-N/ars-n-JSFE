import './settings.scss';
import { BaseComponent } from '../../shared/baseComponent';
import { addListenerSelect } from '../../utils/addListenerSelectCards';

export class Settings extends BaseComponent {
  constructor() {
    super('div', ['settings-page']);
    this.addField('Game cards', ['animals', 'pets'], 'cordsCollection');
    this.addField('Difficulty', ['4x3', '4x4', '5x4'], 'difficulty');
    addListenerSelect('#cordsCollection');
    addListenerSelect('#difficulty');
  }

  addField(title:string, optionList: string[], id: string): void {
    const $titleFiled = new BaseComponent('h3', ['title']).element;
    $titleFiled.innerText = title;
    const $select = new BaseComponent('select', ['setting__select']).element;
    optionList.forEach((option) => {
      const $option = new BaseComponent('option', ['option']).element;
      $option.innerText = option;
      $select.appendChild($option);
    });
    $select.id = id;

    const $settingsField = new BaseComponent('label', ['setting-field']).element;
    $settingsField.appendChild($titleFiled);
    $settingsField.appendChild($select);
    this.element.appendChild($settingsField);
  }
}
