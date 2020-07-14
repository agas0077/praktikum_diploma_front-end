const eValidator = require('email-validator');

// Чтобы работал, надо в качестве аргумента передать массив всех возможно-существующих форм
export default class Form_validation {
  constructor(formsNamesArray) {
    formsNamesArray.forEach((item) => {
      this[item] = item;
    });
  }

  // Определяет имена инпутов в открывшейся форме
  _defineNames() {
    const form = Object.values(document.forms[0]);
    const names = form
      .map((i) => i.name)
      .filter((i) => i !== '');
    return names;
  }

  // Находит элементы формы, когда создается попап
  _findInDOM(arr) {
    let temp;
    temp = arr.map((item) => document.querySelector(`#${item}`));
    return temp;
  }

  // Для каждого поля отдельно
  _checkInputValidity(event) {
    this._validation(event.target);
    this._allValid(event.target);
  }

  // Функция проверяет валидны ли все элементы формы
  _allValid(formElement) {
    const inputs = Array.from(formElement.form.elements);

    let isFormValid = true;

    inputs.forEach((elem) => {
      if (elem.id !== this._defineButton()) {
        if (!this._validation(elem)) isFormValid = false;
      }
    });

    this._setSubmitButtonState(isFormValid);
  }

  // Проверяет введенные сообщения в элементы формы на соответствия требованиям валидации
  _validation(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (element.id === 'email' && !eValidator.validate(element.value)) {
      this._activateError(errorElement, element);
      return false;
    }
    if (!element.checkValidity()) {
      this._activateError(errorElement, element);
      return false;
    }
    if (element.value.length === 0) {
      this._activateError(errorElement, element);
      return false;
    }
    if (element.checkValidity()) {
      this._removeError(errorElement, element);
      return true;
    }
  }

  // Если checkValidity() возвращает fasle, то функция редактирует внешний вид блоков с сообщениями
  // об ошибке
  _activateError(errorElement, element) {
    errorElement.textContent = this._errorMessage(element);
    element.classList.remove('form__input_valid');
    element.classList.add('form__input_invalid');
    errorElement.style = null;
  }

  // Если ошибка была исправлена или checkValidity() изначально возвращала true, то либо все
  // возвращается назад, либо просто ничего не происходит
  _removeError(errorElement, element) {
    element.classList.remove('from__input_invalid');
    element.classList.add('form__input_valid');
    errorElement.style.display = 'none';
  }

  // Определяет в каком случае какое сообщение надо показать
  _errorMessage(element) {
    switch (element.name) {
      case 'email':
        if (element.value.length === 0) return 'Это обязательное поле';
        if (!eValidator.validate(element.value)) return 'Здесь должен быть e-mail';
        break;
      case 'password':
        if (element.value.length === 0) return 'Это обязательное поле';
        break;
      case 'name':
        if (element.value.length === 0) return 'Это обязательное поле';
        if (element.value.length === 1) return 'Должно быть от 2 до 30 символов';
        break;
    }
  }

  // Определяет id кнопки
  _defineButton() {
    const button = event.target.form['auth-button'] ? 'auth-button' : 'reg-button';
    return button;
  }

  // Функция блокирует или разблокирует кнопку сохранения
  _setSubmitButtonState(isFormValid) {
    const button = this._defineButton();
    if (isFormValid) {
      return event.target.form[button].removeAttribute('disabled');
    }
    if (!(isFormValid && event.target.form[button].hasAttribute('disabled'))) {
      return event.target.form[button].setAttribute('disabled', true);
    }
  }

  // Определяет свой слушатель каждому элементу, переданному в конструктор
  setEventListeners() {
    this._findInDOM(this._defineNames()).forEach((item) => {
      item.addEventListener('input', () => {
        this._checkInputValidity.call(this, event);
      });
    });
  }
}
