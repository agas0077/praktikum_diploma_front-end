import './mainPage.css';

// Импорт классов
import { pop } from 'core-js/fn/array';
import Api from '../js/api/Api';
import Popup from '../js/components/Popup';
import Header from '../js/components/Header';
import From from '../js/components/From';
import Cookie from '../js/utils/Cookie';
import FormValidation from '../js/components/FormValidation';
import ErrorHandler from '../js/api/ErrorHandler';

// Константы
const allPossibleForms = ['reg', 'auth'];

// Переменные
let whatPopupIsOpened;

// Инициализация классов

// Поменять на mesto4
const api = new Api('http://localhost:3000');
const validation = new FormValidation(allPossibleForms);
const cookie = new Cookie();
const popup = new Popup(validation);
const header = new Header('main', cookie);
const form = new From();
const errorHandler = new ErrorHandler();


// Рендер хеддера
header.renderHeader();
window.addEventListener('resize', () => {
  header.renderHeader();
});


// Слушатели
document.addEventListener('click', (event) => {
  // Слушатель открытия десктопного попапа входа
  if (event.target.id === 'login-button') {
    popup.openPopup('auth-desktop-popup');
    whatPopupIsOpened = '.popup';
  }

  // Слушатель закрытия десктопного попапа
  if (event.target.classList.contains('popup__close')) {
    popup.closePopup('.popup');
    whatPopupIsOpened = '';
  }

  // Переключение попапов
  if (event.target.classList.contains('switcher')) {
    popup.switching();
  }

  // Сабмит попапов
  if (event.target.classList.contains('form__button')) {
    event.preventDefault();
    const toSubmit = form.getCredentials(event.target.id);
    switch (toSubmit.form) {
      case 'auth':
        api.signIn(toSubmit)
          .then((res) => {
            if (res.status === 200) {
              popup.closePopup(whatPopupIsOpened);
              header.renderHeader();
            } else {
              errorHandler.activateError(res);
            }
          });
        break;

      case 'reg':
        api.signUp(toSubmit)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              popup.closePopup(whatPopupIsOpened);
              switch (whatPopupIsOpened) {
                case '.popup':
                  popup.openPopup('sucesses-popup');
                  break;
                case '.mobile-popup':
                  popup.openPopup('success-mobile-popup');
              }
            } else {
              errorHandler.activateError(res);
            }
          });
    }
  }

  // Логаут десктоп
  if (event.target.id === 'logout-button' || event.target.id === 'logout-image') {
    api.signOut().then(() => {
      header.renderHeader();
    });
  }

  // Логаут мобильная версия
  if (event.target.id === 'mobile-logout-button' || event.target.id === 'mobile-logout-image') {
    api.signOut().then(() => {
      header.closeMobileMenu();
      header.renderHeader();
    });
  }

  // Открытие мобильного меню
  if (event.target.id === 'mobile-menu-button') {
    header.openMobileMenu(event);
  }

  // Закрытите мобильного меню и мобильных попапов
  if (event.target.id === 'mobile-menu-close') {
    if (document.querySelector('.mobile-menu')) {
      header.closeMobileMenu();
    }
    if (document.querySelector('.mobile-popup')) {
      popup.closePopup('.mobile-popup');
    }
    header.changeMobileHeaderButton(event);
  }

  // Открытие мобильного попапа входа
  if (event.target.id === 'mobile-login-button') {
    header.closeMobileMenu(event);
    popup.openPopup('auth-mobile-popup');
    whatPopupIsOpened = '.mobile-popup';
  }

  if (event.target.classList.contains('search__button')) {
    api.someGet();
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    popup.closePopup('.popup');
  }
});
