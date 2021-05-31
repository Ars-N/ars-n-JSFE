import './pop-up-input.scss';
import { BaseComponent } from '../../../../shared/baseComponent';
import { addImgValidStatus } from '../../../../utils/addImgValidStatus';
import { checkFillAllInputs } from '../../../../utils/checkFullValidInput';
import { checkCondition } from '../../../../shared/checkConditions/checkCondition';

export class PopUpInput extends BaseComponent {
  private readonly type;

  private readonly inputName;

  public isValid;

  constructor(type:string, inputName:string, id?:string) {
    super('input', ['pop-up_input']);
    this.inputName = inputName;
    this.type = type;
    this.isValid = false;
    if (id) this.element.id = id as string;
    this.element.setAttribute('type', type);
    this.element.setAttribute('name', inputName);
    this.element.setAttribute('placeholder', inputName);
    (this.element as HTMLInputElement).required = true;
    this.validInput();
  }

  private validInput() {
    this.addInputValidStatus('text', /^[\p{L} ]{1,30}$/gmiu);
    this.addInputValidStatus('email', /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/gmiu);
    this.addInputValidStatus('file', /([^\s]+(?=\.(jpg|png|svg|gif))\.\2)/gmi);
  }

  // todo FixBag!!!
  private addInputValidStatus(inputType: string, regExp: RegExp) {
    if (this.type === inputType) {
      this.element.addEventListener('input', (event) => {
        const $input = event.target as HTMLInputElement;
        const isValid = regExp.test($input.value);
        if (inputType === 'file') {
          if (isValid) {
            const $wrapperInput = this.element.parentNode as HTMLElement;
            $wrapperInput.style.backgroundColor = '';

            // Load Img file
            if ($input.files) {
              const file = $input.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                if (typeof reader.result === 'string') {
                  ($wrapperInput.firstChild as HTMLImageElement).src = reader.result;
                }
              };
              reader.readAsDataURL(file);
            }
          } else {
            (this.element.parentNode as HTMLElement).style.backgroundColor = 'darkred';
          }
        } else {
          addImgValidStatus(isValid, this.element);
        }
        // next line for fix bag
        regExp.test((event.target as HTMLInputElement).value);
        $input.setAttribute('data-valid', `${isValid}`);
        this.isValid = isValid;
        // check all inputs
        checkCondition();
        checkFillAllInputs();
      });
    }
  }
}
