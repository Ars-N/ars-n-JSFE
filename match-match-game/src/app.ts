import { Header } from './components/header/header';
import { Main } from './components/main/main';

export class App {
  private readonly main: Main;

  private readonly header: Header;

  constructor(private readonly rootElement: Element) {
    this.header = new Header();
    this.main = new Main();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.main.element);
  }
}
