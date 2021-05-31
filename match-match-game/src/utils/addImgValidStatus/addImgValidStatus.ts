import Valid from '../../assets/Valid.svg';
import notValid from '../../assets/notValid.svg';

export function addImgValidStatus(isValid = false, node?: HTMLElement): void {
  setTimeout(() => {
    const $imgValidWrapper = document.querySelectorAll('.about__pop-up_input-field');

    if (isValid && node) {
      (((node.parentNode as HTMLElement).parentNode as HTMLElement).lastChild as HTMLElement).remove();
      ((node.parentNode as HTMLElement).parentNode as HTMLElement)
        .insertAdjacentHTML('beforeend', `<img src="${Valid}" alt="img">`);
      // remove style error
      node.style.backgroundColor = '';
    } else if (!isValid && node) {
      (((node.parentNode as HTMLElement).parentNode as HTMLElement).lastChild as HTMLElement).remove();
      ((node.parentNode as HTMLElement).parentNode as HTMLElement)
        .insertAdjacentHTML('beforeend', `<img src="${notValid}" alt="img">`);
    } else {
      $imgValidWrapper.forEach((input) => {
        input.insertAdjacentHTML('beforeend', `<img src="${notValid}" alt="img">`);
      });
    }
  }, 0);
}
