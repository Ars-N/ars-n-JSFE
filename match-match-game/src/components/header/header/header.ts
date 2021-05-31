import './header.scss';
import { BaseComponent } from '../../../shared/baseComponent';
import { Logo } from '../logo';
import { Nav } from '../nav';
import { HeaderBtn } from '../header-btn';
import { IndexedDb } from '../../../utils/DB';

export class Header extends BaseComponent {
  private readonly logo;

  private readonly nav;

  private readonly btn;

  private readonly Db;

  constructor() {
    super('header', ['header']);
    this.logo = new Logo();
    this.nav = new Nav();
    this.btn = new HeaderBtn();
    this.Db = new IndexedDb();
    this.element.appendChild(this.logo.element);
    this.element.appendChild(this.nav.element);
    this.element.appendChild(this.btn.element);
  }
}
