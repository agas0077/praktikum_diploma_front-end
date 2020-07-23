import menuButtonBlack from '../../images/menu-button-black.png';
import menuButtonWhite from '../../images/menu-button-white.png';
import closeButtonWhite from '../../images/close.png';
import exitButtonWhite from '../../images/exit-white.png';


export default class Header {
  constructor(page, cookieClass) {
    this.page = page;
    this.cookie = cookieClass;
    this.isLogged = this.cookie.getACookieValue('isLogged') === '1';
    this.name = this.cookie.getACookieValue('name');
    this.color = this._blackOrWhite();
  }

  _renderMainHeader() {
    return `
        <div class="header header_${this.color}">
          <a href="./index.html" class="header__title header__title_${this.color}">NewsExplorer</a>
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
        <a href="./index.html" class="menu__button menu__button_${this.page === 'main' ? `on-${this.color}` : 'off'} menu__button_${this.color}">Главная</a>
        <a href="./secondPage.html" class="menu__button menu__button_${this.page === 'main' ? 'off' : `on-${this.color}`} menu__button_${this.color}">Сохраненные статьи</a>
        <button id="logout-button" type="button" class="menu__auth menu__auth_${this.color}">${this.name} &nbsp;<img id="logout-image" src="./images/exit-${this.color}.png"></button>
      </div>
    `;
  }

  _renderMenuIfNotLogged() {
    return `
      <div class="menu">
        <a href="./index.html" class="menu__button menu__button_on-${this.color} menu__button_${this.color}">Главная</a>
        <button id="login-button" type="button" class="menu__auth menu__auth_${this.color}">Авторизоваться</button>
      </div>
    `;
  }

  _removeHeader() {
    if (document.querySelector('.header')) {
      document.querySelector('.header').remove();
    }
    if (document.querySelector('.mobile-header')) {
      document.querySelector('.mobile-header').remove();
    }
  }

  _renderMobileHeader() {
    return `
      <div class="mobile-header mobile-header_${this.color}">
        <div class="mobile-header__title">NewsExplorer</div>
        <img id="mobile-menu-button" class="mobile-header__menu-button" src="${this.page === 'main' ? menuButtonWhite : menuButtonBlack}" alt="Кнопка меню">
        <img style="display: none" id="mobile-menu-close" class="mobile-header__menu-button" src="${closeButtonWhite}" alt="Кнопка меню">
      </div>
    `;
  }

  _renderMobileMenuIfLogged() {
    return `
    <div class="mobile-menu">
      <div class="mobile-menu__content">
        <a href="./index.html" class="mobile-menu__button">Главная</a>
        <a href="./secondPage.html" class="mobile-menu__button">Сохраненные статьи</a>
        <button type="button" id="mobile-logout-button" class="mobile-menu__auth">${this.name} &nbsp;<img id="mobile-logout-image" src="${exitButtonWhite}" alt="Выход"></button>
      </div>
    </div>
    `;
  }

  _renderMobileMenuIfNotLogged() {
    return `
      <div class="mobile-menu">
        <div class="mobile-menu__content">
          <a href="./index.html" class="mobile-menu__button">Главная</a>
          <button type="button" id="mobile-login-button" class="mobile-menu__auth">Авторизоваться</button>
        </div>
      </div>
      `;
  }

  _renderMobileMenu() {
    return this.isLogged ? this._renderMobileMenuIfLogged() : this._renderMobileMenuIfNotLogged();
  }

  changeMobileHeaderButton(event) {
    if (event.target.id === 'mobile-menu-button') {
      document.querySelector('#mobile-menu-button').style.display = 'none';
      document.querySelector('#mobile-menu-close').style = null;
    }
    if (event.target.id === 'mobile-menu-close') {
      document.querySelector('#mobile-menu-close').style.display = 'none';
      document.querySelector('#mobile-menu-button').style = null;
    }
  }

  openMobileMenu(event) {
    document.querySelector('body').insertAdjacentHTML('afterbegin', this._renderMobileMenu());
    document.querySelector('.mobile-header').classList.remove(`mobile-header_${this.color}`);
    document.querySelector('.mobile-header').classList.add('mobile-header_open');
    this.changeMobileHeaderButton(event);
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    document.querySelector('.mobile-menu').remove();
    document.querySelector('.mobile-header').classList.add(`mobile-header_${this.color}`);
    document.querySelector('.mobile-header').classList.remove('mobile-header_open');
    document.body.style.overflow = '';
  }

  renderHeader() {
    this._removeHeader();
    this.isLogged = this.cookie.getACookieValue('isLogged') === '1';
    this.name = this.cookie.getACookieValue('name');
    const windowWidth = window.innerWidth > 550;
    switch (windowWidth) {
      case true:
        document.querySelector(`${this.page === 'main' ? '.header-container' : 'body'}`).insertAdjacentHTML('afterbegin', this._renderMainHeader());
        break;
      case false:
        document.querySelector(`${this.page === 'main' ? '.header-container' : 'body'}`).insertAdjacentHTML('afterbegin', this._renderMobileHeader());
    }
  }
}
