export default class SearchValidation {
  constructor(errorSpan) {
    this.errorSpan = errorSpan;
  }

  // Валидирует поле поисковика
  validate(inputValue) {
    if (inputValue) {
      return true;
    }
    return false;
  }

  // Активирует сообщение об ошибке
  activateErrorMessage() {
    this.errorSpan.setAttribute('style', 'transition: opacity 5s cubic-bezier(1,.03,1,.29);');
    this.errorSpan.classList.add('button-error-message_animation');
  }

  // Деактивирует сообщение об ошибке
  deactivateErrorMessage() {
    this.errorSpan.style = '';
    this.errorSpan.classList.remove('button-error-message_animation');
  }
}
