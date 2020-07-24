export default class From {
  // Определяет форму по нажатой кнопке
  _defineFormByButton(buttonId) {
    switch (buttonId) {
      case 'auth-button':
        return 'auth';

      case 'reg-button':
        return 'reg';

      case 'search-button':
        return 'search';
    }
  }

  // Достает информацию из формы
  getDataFromForm(buttonId) {
    const form = this._defineFormByButton(buttonId);
    if (form === 'auth') {
      return {
        form,
        email: document.forms[form].email.value,
        password: document.forms[form].password.value,
      };
    }
    if (form === 'reg') {
      return {
        form,
        email: document.forms[form].email.value,
        password: document.forms[form].password.value,
        name: document.forms[form].name.value,
      };
    }
    if (form === 'search') {
      return {
        form,
        key: document.forms[form].searchField.value,
      };
    }
  }
}
