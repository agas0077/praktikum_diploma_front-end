import './mainPage.css';

// Импорт классов
import Api from '../js/api/Api';
import Popup from '../js/components/Popup';
import Header from '../js/components/Header';
import From from '../js/components/From';
import Cookie from '../js/utils/Cookie';


// Инициализация классов

// Поменять на mesto4
const api = new Api('http://localhost:3000');
const cookie = new Cookie();
const popup = new Popup();
const header = new Header('main', cookie);
const form = new From();

// Рендер хеддера
header.render();

// Слушатели
document.addEventListener('click', (event) => {
  console.log(event.target)
  // Слушатель открытия попапа входа
  if (event.target.id === 'login-button') {
    popup.openPopup('auth-desktop-popup');
  }
  // Слушатель закрытия попапа
  if (event.target.classList.contains('popup__close')) {
    popup.closePopup();
  }
  // Переключение попапов
  if (event.target.classList.contains('switcher')) {
    popup.switching();
  }
  // Сабмит формы
  if (event.target.classList.contains('form__button')) {
    event.preventDefault();
    const toSubmit = form.getCredentials(event.target.id);
    switch (toSubmit.form) {
      case 'auth':
        api.signIn(toSubmit)
          .then((res) => {
            switch (res.status) {
              case 1:
                popup.closePopup();
                header.render();
              case 0:
                
            }
          });
        break;

      case 'reg':
        api.signUp(toSubmit)
          .then((res) => {
          });
    }
  }
  // Логаут
  if (event.target.id === 'logout-button' || event.target.id === 'logout-image') {
    api.signOut().then(() => {
      header.render();
    })
  }
  if (event.target.classList.contains('search__button')) {
    api.someGet()
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    popup.closePopup();
  }
});
