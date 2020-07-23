import closeImg from '../../images/close.png';

export default class Popup {
  constructor(validation) {
    this.validation = validation;
    this.body = document.querySelector('body');
  }

  _renderRegPopup() {
    return `
    <div class="popup" id='reg-desktop-popup'>
      <div class="popup__content popup__content_general">
        <img src="${closeImg}" alt="Кнопка закрытия" class="popup__close">
        <h3 class="popup__title">Регистрация</h3>

        <form novalidate class="form" name="reg">

          <p class="form__field-name">E-mail</p>
          <input required autocomplete="username" type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
          <span style='display: none' id='error-email' class='error-message error-message_input'></span>

          <p class="form__field-name">Пароль</p>
          <input required autocomplete="new-password" type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
          <span style='display: none' id='error-password' class='error-message error-message_input'></span>

          <p class="form__field-name">Имя</p>
          <input required minlength=2 maxlength=30 type="text" id='name' name="name" class="form__input form__input_valid" placeholder="Введите своё имя">
          <span style='display: none' id='error-name' class='error-message error-message_input'></span>

          <span style='display: none' id='error-api' class='error-message error-message_api'></span>
          <button disabled type='submit' id='reg-button' class="form__button form__button_margin">Зарегистрироваться</button>
        </form>

        <p class="switcher">или <span><button class="switcher switcher_button">Вход</button></span></p>

      </div>
    </div>
    `;
  }

  _renderAuthPopup() {
    return `
      <div class="popup" id='auth-desktop-popup'>
        <div class="popup__content popup__content_general">
          <img src="${closeImg}" alt="Кнопка закрытия" class="popup__close">
          <h3 class="popup__title">Вход</h3>
          <form novalidate class="form" name="auth">

            <p class="form__field-name">E-mail</p>
            <input required autocomplete="username" type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
            <span style="display: none" id="error-email" class="error-message error-message_input"></span>

            <p class="form__field-name">Пароль</p>
            <input required autocomplete="current-password" type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
            <span style="display: none" id='error-password' class='error-message error-message_input'></span>

            <span style='display: none' id='error-api' class='error-message error-message_api'></span>
            <button disabled type='submit' id='auth-button' class="form__button form__button_margin">Войти</button>
          </form>

          <p class="switcher">или <span><button class="switcher switcher_button">Зарегистрироваться</button></span></p>

        </div>
      </div>
    `;
  }

  _renderSuccessPopup() {
    return `
      <div class="popup" id='sucesses-popup'>
        <div class="popup__content popup__content_sucesses">
          <img src="${closeImg}" alt="Кнопка закрытия" class="popup__close">
          <h3 class="popup__title popup__title_sucesses">Пользователь успешно зарегистрирован!</h3>
          <button class="switcher switcher_button">Выполнить вход</button>
        </div>
      </div>
    `;
  }

  _renderAuthMobilePopup() {
    return `
    <div class="mobile-popup" id="auth-mobile-popup">
      <h3 class="mobile-popup__title">Вход</h3>
      <form novalidate class="form" name="auth">

        <p class="form__field-name">E-mail</p>
        <input required autocomplete="username" type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
        <span style="display: none" id="error-email" class="error-message error-message_input"></span>

        <p class="form__field-name">Пароль</p>
        <input required autocomplete="current-password" type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
        <span style='display: none' id='error-password' class='error-message error-message_input'></span>

        <span style='display: none' id='error-api' class='error-message error-message_api'></span>
        <button disabled type='submit' id='auth-button' class="form__button form__button_margin">Войти</button>
      </form>

      <p class="switcher">или <span><button class="switcher switcher_button">Зарегистрироваться</button></span></p>
    </div>
    `;
  }

  _rednerRegMobilePopup() {
    return `
    <div class="mobile-popup" id='reg-mobile-popup'>
      <h3 class="mobile-popup__title">Регистрация</h3>
      <form novalidate class="form" name="reg">

          <p class="form__field-name">E-mail</p>
          <input required autocomplete="username" type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
          <span style='display: none' id='error-email' class='error-message error-message_input'></span>

          <p class="form__field-name">Пароль</p>
          <input required autocomplete="new-password" type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
          <span style='display: none' id='error-password' class='error-message error-message_input'></span>

          <p class="form__field-name">Имя</p>
          <input required minlength=2 maxlength=30 type="text" id='name' name="name" class="form__input form__input_valid" placeholder="Введите своё имя">
          <span style='display: none' id='error-name' class='error-message error-message_input'></span>

          <span style='display: none' id='error-api' class='error-message error-message_api'></span>
          <button disabled type='submit' id='reg-button' class="form__button form__button_margin">Зарегистрироваться</button>
        </form>

        <p class="switcher">или <span><button class="switcher switcher_button">Вход</button></span></p>
    </div>
    `;
  }

  _renderSuccessMobilePopup() {
    return `
    <div class="mobile-popup" id='sucesses-popup'>
      <div class="popup__content popup__content_sucesses">
        <h3 class="popup__title popup__title_sucesses">Пользователь успешно зарегистрирован!</h3>
        <button class="switcher switcher_button">Выполнить вход</button>
      </div>
    </div>
    `;
  }

  switching() {
    if (document.querySelector('.popup')) {
      let whatShouldBeOpend;
      if (document.querySelector('#reg-desktop-popup')) {
        whatShouldBeOpend = 'auth-desktop-popup';
      }
      if (document.querySelector('#auth-desktop-popup')) {
        whatShouldBeOpend = 'reg-desktop-popup';
      }
      if (document.querySelector('#sucesses-popup')) {
        whatShouldBeOpend = 'auth-desktop-popup';
      }
      this.closePopup('.popup');
      this.openPopup(whatShouldBeOpend);
    }

    if (document.querySelector('.mobile-popup')) {
      let whatShouldBeOpend;
      if (document.querySelector('#reg-mobile-popup')) {
        whatShouldBeOpend = 'auth-mobile-popup';
      }
      if (document.querySelector('#auth-mobile-popup')) {
        whatShouldBeOpend = 'reg-mobile-popup';
      }
      if (document.querySelector('#sucesses-popup')) {
        whatShouldBeOpend = 'auth-mobile-popup';
      }
      this.closePopup('.mobile-popup');
      this.openPopup(whatShouldBeOpend);
    }
  }

  openPopup(popupId) {
    switch (popupId) {
      case 'reg-desktop-popup':
        this.body.insertAdjacentHTML('afterbegin', this._renderRegPopup());
        this.validation.setEventListeners.call(this.validation);
        break;

      case 'auth-desktop-popup':
        this.body.insertAdjacentHTML('afterbegin', this._renderAuthPopup());
        this.validation.setEventListeners.call(this.validation);
        break;

      case 'sucesses-popup':
        this.body.insertAdjacentHTML('afterbegin', this._renderSuccessPopup());
        break;

      case 'auth-mobile-popup':
        this.body.insertAdjacentHTML('afterbegin', this._renderAuthMobilePopup());
        this.validation.setEventListeners.call(this.validation);
        document.body.style.overflow = 'hidden';
        break;

      case 'success-mobile-popup':
        this.body.insertAdjacentHTML('afterbegin', this._renderSuccessMobilePopup());
        document.body.style.overflow = 'hidden';
        break;

      case 'reg-mobile-popup':
        this.body.insertAdjacentHTML('afterbegin', this._rednerRegMobilePopup());
        document.body.style.overflow = 'hidden';
        this.validation.setEventListeners.call(this.validation);
    }
  }

  closePopup(popupClass) {
    document.querySelector(popupClass).remove();
    document.body.style.overflow = '';
  }
}
