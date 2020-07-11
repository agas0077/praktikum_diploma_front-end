export default class Header {

  constructor(page) {
    this.page = page;
    this.isLogged = false;
  }

  _renderMain() {
    return `
        <div class="header header_white">
          <div class="header__title header__title_white">NewsExplorer</div>
          ${this.isLogged ? this._renderMenuIfLogged() : this._renderMenuIfNotLogged()}
        </div>
      `
  };

  _blackOrWhite() {
    return page === 'main' ? 'white' : 'black'
  }

  _renderMenuIfLogged() {
    return `
      <div class="menu">
        <a href="./index.html" class="menu__button menu__button_on-${this._blackOrWhite()} menu__button_${this._blackOrWhite()}">Главная</a>
        <a href="./secondPage.html" class="menu__button menu__button_off menu__button_${this._blackOrWhite()}">Сохраненные статьи</a>
        <button id="logout-button" type="button" class="menu__auth menu__auth_${this._blackOrWhite()}">Грета &nbsp;<img src="<%=require('../images/exit-${this._blackOrWhite()}.png')%>"></button>
      </div>
    `
  }

  _renderMenuIfNotLogged() {
    return `
      <div class="menu">
        <a href="./index.html" class="menu__button menu__button_on-white menu__button_white">Главная</a>
        <button id="login-button" type="button" class="menu__auth menu__auth_white">Авторизоваться</button>
      </div>
    `
  }

  _isLoggedOrNot() {
    // Доработать
    document.cookie.jwt ? this.isLogged = true : this.isLogged = fasle;
  }

  render() {
    switch (this.page) {
      case 'main':
        document.querySelector('.header-container').insertAdjacentHTML('afterbegin', this._renderMain())
      case 'second':
        return
    }
  }



}
