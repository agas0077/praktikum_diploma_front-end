export default class Header {
  constructor(page, cookie) {
    this.page = page;
    this.cookie = cookie;
    this.isLogged = this.cookie.getACookieValue('isLogged') === '1' ? true : false;
    this.name = this.cookie.getACookieValue('name')
  }

  _renderMain() {
    return `
        <div class="header header_white">
          <div class="header__title header__title_white">NewsExplorer</div>
          ${this.isLogged ? this._renderMenuIfLogged() : this._renderMenuIfNotLogged()}
        </div>
      `;
  }

  _blackOrWhite() {
    return this.page === 'main' ? 'white' : 'black';
  }

  _renderMenuIfLogged() {
    return `
      <div class="menu">
        <a href="./index.html" class="menu__button menu__button_on-${this._blackOrWhite()} menu__button_${this._blackOrWhite()}">Главная</a>
        <a href="./secondPage.html" class="menu__button menu__button_off menu__button_${this._blackOrWhite()}">Сохраненные статьи</a>
        <button id="logout-button" type="button" class="menu__auth menu__auth_${this._blackOrWhite()}">${this.name} &nbsp;<img id="logout-image" src="./images/exit-${this._blackOrWhite()}.png"></button>
      </div>
    `;
  }

  _renderMenuIfNotLogged() {
    return `
      <div class="menu">
        <a href="./index.html" class="menu__button menu__button_on-white menu__button_white">Главная</a>
        <button id="login-button" type="button" class="menu__auth menu__auth_white">Авторизоваться</button>
      </div>
    `;
  }

  _removeHeader() {
    if (document.querySelector('.header')) {
      document.querySelector('.header').remove();
    }
  }

  render() {
    this._removeHeader()
    this.isLogged = this.cookie.getACookieValue('isLogged') === '1' ? true : false;
    this.name = this.cookie.getACookieValue('name')
    switch (this.page) {
      case 'main':
        document.querySelector('.header-container').insertAdjacentHTML('afterbegin', this._renderMain());
      case 'second':
    }
  }
}
