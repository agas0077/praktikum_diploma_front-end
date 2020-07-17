export default class SearchValidation {
  constructor(errorSpan) {
    this.errorSpan = errorSpan;
  }

  validate(inputValue) {
    if (inputValue) {
      return true;
    }
    return false;
  }

  activateErrorMessage() {
    this.errorSpan.setAttribute('style', 'transition: opacity 5s cubic-bezier(1,.03,1,.29);');
    this.errorSpan.classList.add('button-error-message_animation');
  }

  deactivateErrorMessage() {
    this.errorSpan.style = '';
    this.errorSpan.classList.remove('button-error-message_animation');
  }
}
