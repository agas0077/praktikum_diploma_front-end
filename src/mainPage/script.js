import './mainPage.css';

// Импорт классов
import Api from '../js/api/Api';
import Popup from '../js/components/Popup';
import Header from '../js/components/Header';
import From from '../js/components/From';


// Инициализация классов
const api = new Api('https://api.mesto4.fun');
const popup = new Popup();
const header = new Header('main');
const form = new From();

// Рендер хеддера
header.render();

// Слушатели
document.addEventListener('click', (event) => {
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
                popup.closePopup()
                header.render();
                console.log(document.cookie);

              case 0:

            }
          })
        break;

      case 'reg':
        api.signUp(toSubmit)
          .then((res) => {
          })
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    popup.closePopup();
  }
});
