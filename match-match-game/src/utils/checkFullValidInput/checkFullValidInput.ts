import { submitDisableToggle } from '../../shared/disableBtnSubmit';
import { submitForm } from '../submitForm/submitForm';

export function checkFillAllInputs():void {
  if ([...document.querySelectorAll('input')].some((input) => input.dataset.valid !== 'true')
  ) {
    submitDisableToggle();
  } else {
    submitDisableToggle(false);

    submitForm();
  }
}
