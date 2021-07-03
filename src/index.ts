import {
  Database, EventProvider, Router, Storage,
} from './libs';
import './index.scss';
import Application from './application';

const container = document.getElementById('root');
const database = new Database();
const eventProvider = new EventProvider();
const routingConfig = [
  {
    pattern: /page-1/,
    target: 'page-1',
  },
  {
    pattern: /page-2/,
    target: 'page-2',
  },
  {
    pattern: '',
    target: 'page-0',
  },
];
const router = new Router(routingConfig);
const storage = new Storage();
const application = new Application(container, database, eventProvider, router, storage);

application.init();
