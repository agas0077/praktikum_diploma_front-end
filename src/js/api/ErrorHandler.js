export default class ErrorHandler {
  activateError(message) {
    const errorElement = document.querySelector('#error-api');
    document.querySelector('.form__button').classList.remove('form__button_margin');
    errorElement.textContent = message;
    errorElement.style = null;
  }

  deactivateError() {
    const errorElement = document.querySelector('#error-api');
    document.querySelector('.form__button').classList.add('form__button_margin');
    errorElement.style.display = none;
    errorElement.textContent = '';
  }
}
