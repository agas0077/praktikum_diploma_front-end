export default class From {
  defineFormByButton(buttonId) {
    switch (buttonId) {
      case 'auth-button':
        return 'auth';

      case 'reg-button':
        return 'reg';
    }
  }

  getCredentials(buttonId) {
    const form = this.defineFormByButton(buttonId);
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
  }
}
