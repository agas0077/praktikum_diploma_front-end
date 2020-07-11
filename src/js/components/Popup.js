export default class Popup {

  _renderRegPopup() {
    return `
    <div class="popup" id='reg-desktop-popup'>
      <div class="popup__content popup__content_general">
        <img src="../images/close.png" alt="Кнопка закрытия" class="popup__close">
        <h3 class="popup__title">Регистрация</h3>

        <form novalidate class="form" name="reg">

          <p class="form__field-name">E-mail</p>
          <input required type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
          <span style='display: none' id='error-email' class='error-message'></span>

          <p class="form__field-name">Пароль</p>
          <input required type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
          <span style='display: none' id='error-password' class='error-message'></span>

          <p class="form__field-name">Имя</p>
          <input required type="text" id='name' name="name" class="form__input form__input_valid" placeholder="Введите своё имя">
          <span style='display: none' id='error-name' class='error-message'></span>

          <button type='submit' id='reg-button' class="form__button">Зарегистрироваться</button>
        </form>

        <p class="switcher">или <span><button class="switcher switcher_button">Вход</button></span></p>

      </div>
    </div>
    `
  }

  _renderAuthPopup() {
    return `
      <div class="popup" id='auth-desktop-popup'>
        <div class="popup__content popup__content_general">
          <img src="./images/close.png" alt="Кнопка закрытия" class="popup__close">
          <h3 class="popup__title">Вход</h3>
          <form novalidate class="form" name="auth">

            <p class="form__field-name">E-mail</p>
            <input required type="email" id='email' name="email" class="form__input form__input_valid" placeholder="Введите свой E-mail">
            <span style='display: none' id='error-email' class='error-message'></span>

            <p class="form__field-name">Пароль</p>
            <input required type="password" id='password' name="password" class="form__input form__input_valid" placeholder="Введите пароль">
            <span style='display: none' id='error-password' class='error-message'></span>

            <button type='submit' id='auth-button' class="form__button">Войти</button>
          </form>

          <p class="switcher">или <span><button class="switcher switcher_button">Зарегистрироваться</button></span></p>

        </div>
      </div>
    `
  }

  switching() {
    let whatShouldBeOpend
    if (document.getElementById('reg-desktop-popup')) {
      whatShouldBeOpend = 'auth-desktop-popup'
    }
    if (document.getElementById('auth-desktop-popup')) {
      whatShouldBeOpend = 'reg-desktop-popup'
    }
    this.closePopup()
    this.openPopup(whatShouldBeOpend)
  }

  openPopup(popupId) {
    switch (popupId) {
      case 'reg-desktop-popup':
        document.querySelector('body').insertAdjacentHTML('afterbegin', this._renderRegPopup())
        break;

      case 'auth-desktop-popup':
        document.querySelector('body').insertAdjacentHTML('afterbegin', this._renderAuthPopup())
    }

  }

  closePopup() {
    document.querySelector('.popup').remove()
  }

}
