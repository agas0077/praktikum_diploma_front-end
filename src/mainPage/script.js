import './mainPage.css';

// Импорт классов
import Api from '../js/api/Api';
import Popup from '../js/components/Popup';
import Header from '../js/components/Header';
import From from '../js/components/From';
import Cookie from '../js/utils/Cookie';
import FormValidation from '../js/components/FormValidation';
import ErrorHandler from '../js/api/ErrorHandler';
import NewsApi from '../js/api/NewsApi';
import Searcher from '../js/components/Searcher';
import Card from '../js/components/Card';
import SearchValidation from '../js/components/SearchValidation';

// Константы
const page = 'main';
const allPossiblePopupForms = ['reg', 'auth'];
const allPossibleSearchContainers = ['cards-container', 'preloader-container', 'not-found-container'];
const searchForm = document.forms.search;
const errorSpan = document.querySelector('.button-error-message');

// Переменные
let whatPopupIsOpened;

// Инициализация классов

const api = new Api('https://api.mesto4.fun');
const validation = new FormValidation(allPossiblePopupForms);
const cookie = new Cookie();
const popup = new Popup(validation);
const header = new Header(page, cookie);
const form = new From();
const errorHandler = new ErrorHandler();
const newsApi = new NewsApi();
const card = new Card(page, cookie);
const searcher = new Searcher(card, allPossibleSearchContainers, page);
const searchValidation = new SearchValidation(errorSpan);


// Рендер хеддера
header.renderHeader();
window.addEventListener('resize', () => {
  header.renderHeader();
});


// Слушатели
document.addEventListener('click', (event) => {
  // Открытие десктопного попапа входа
  if (event.target.id === 'login-button') {
    popup.openPopup('auth-desktop-popup');
    whatPopupIsOpened = '.popup';
  }

  // Закрытие десктопного попапа
  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
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
    const toSubmit = form.getDataFromForm(event.target.id);
    switch (toSubmit.form) {
      case 'auth':
        api.signIn(toSubmit)
          .then((res) => {
            if (res.status === 200) {
              card.setSaveButtonAndMessageState();
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
      searcher.removeContainerFromDOM('cards-container');
      header.renderHeader();
    });
  }

  // Логаут мобильная версия
  if (event.target.id === 'mobile-logout-button' || event.target.id === 'mobile-logout-image') {
    api.signOut().then(() => {
      searcher.removeContainerFromDOM('cards-container');
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

  // Сабмит поиска новостей
  if (event.target.classList.contains('search__button')) {
    event.preventDefault();
    const validationResult = searchValidation.validate(searchForm.searchField.value);
    if (validationResult) {
      searcher.removeContainerFromDOM();
      const whatToSearch = form.getDataFromForm('search-button');
      searcher.addContainerToDOM('preloader-container');
      newsApi.getNews(whatToSearch.key)
        .then((res) => {
          console.log(res);
          searcher.setInitialState(res.res.articles, res.key);
          searcher.addContainerToDOM(res.res.articles.length > 0 ? 'cards-container' : 'not-found-container');
          searcher.addCards();
        });
    }
    if (!validationResult) {
      searchValidation.activateErrorMessage();
      setTimeout(() => {
        searchValidation.deactivateErrorMessage();
      }, 5000);
    }
  }

  // Показать еще
  if (event.target.classList.contains('cards-container__button')) {
    searcher.addCards();
  }

  // Сохранить статью
  if (event.target.classList.contains('card__button_add')) {
    event.preventDefault();
    const cardToSave = event.target.closest('.card');
    const infoToSave = searcher.getArticleToSave(cardToSave);
    api.saveArticle(infoToSave)
      .then((res) => {
        const cardBtn = cardToSave.querySelector('.card__button');
        card.setPushedButtonState(cardBtn);
        searcher.saveArticleId(cardToSave.id, res.id);
      });
  }

  // Удаленить статью
  if (event.target.classList.contains('card__button_add-pushed')) {
    event.preventDefault();
    const cardToDelete = event.target.closest('.card');
    const articleId = searcher.getArticleToDelete(cardToDelete);
    api.deleteArticle(articleId)
      .then(() => {
        searcher.deleteCardFromArticlesToSave.call(searcher, cardToDelete);
        const cardBtn = cardToDelete.querySelector('.card__button');
        card.setPushedButtonState(cardBtn);
      });
  }
});

document.addEventListener('keyup', (event) => {
  // Закрытие попапа по нажатию на ESC
  if (event.key === 'Escape' && document.querySelector('.popup')) {
    popup.closePopup('.popup');
  }
});
