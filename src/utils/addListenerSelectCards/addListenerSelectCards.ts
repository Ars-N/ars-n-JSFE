import { IndexedDb } from '../DB';

export function addListenerSelect(id: string): void {
  setTimeout(() => {
    const $select = document.querySelector(id) as HTMLSelectElement;
    if ($select) {
      $select.addEventListener('mouseup', () => {
        const db = new IndexedDb();
        db.getUser().then((user) => {
          if ($select.id === 'cordsCollection') {
            user.cardsCollection = $select.value;
          } else { user.difficulty = $select.value; }
          db.deleteGamer(user.id);
          db.addNewUser(user);
        });
      });
    }
  }, 0);
}
