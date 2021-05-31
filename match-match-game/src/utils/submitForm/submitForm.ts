import { v4 as uuidv4 } from 'uuid';
import User from '../../interfaces/user';
import { IndexedDb } from '../DB';

export function submitForm(): void {
  setTimeout(() => {
    const $btnSubmit = document.querySelector('button[form="form"]') as HTMLButtonElement;
    $btnSubmit.addEventListener('click', () => {
      const email = (document.querySelector('input[name=E-mail]') as HTMLInputElement).value;
      const firstName = (document.querySelector('input[name="First Name"]') as HTMLInputElement).value;
      const lastName = (document.querySelector('input[name="Last Name"]') as HTMLInputElement).value;
      const img = ((document.querySelector('#avatarInput') as HTMLInputElement).files as FileList)[0];
      const user:User = {
        email, firstName, img, lastName, id: uuidv4(), cardsCollection: 'animals', difficulty: '3x3',
      };
      const db = new IndexedDb();
      db.addNewUser(user);
      (document.querySelector('.pop-up_background') as HTMLElement).remove();
      (document.querySelector('body') as HTMLElement).style.overflow = 'auto';
    });
  }, 0);
}
