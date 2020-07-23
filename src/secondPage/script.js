import './secondPage.css';

// Импорт классов
import Header from '../js/components/Header';
import Cookie from '../js/utils/Cookie';
import Api from '../js/api/Api';
import ArticlesInfo from '../js/components/ArticlesInfo';
import Searcher from '../js/components/Searcher';
import Card from '../js/components/Card';

// Константы
const page = 'secondPage';
const allPossibleSearchContainers = ['cards-container', 'preloader-container', 'not-found-container'];

// Инициализация классов
const cookie = new Cookie();
const header = new Header(page, cookie);
const api = new Api('https://api.mesto4.fun');
const articlesInfo = new ArticlesInfo(cookie);
const card = new Card(page, cookie);
const searcher = new Searcher(card, allPossibleSearchContainers, page);

// Запрет прохождения по прямой ссылке
if (cookie.getACookieValue('isLogged') !== '1') {
  document.location.href = './index.html';
}

// Рендер хеддера
header.renderHeader();
window.addEventListener('resize', () => {
  header.renderHeader();
});

// Запуск страницы
searcher.addContainerToDOM('preloader-container');
api.getArticles()
  .then((res) => {
    searcher.setInitialState(res);
    switch (Array.isArray(res)) {
      case true:
        // Рендер информации о сохраненных статьях
        articlesInfo.setMyArticles(res);
        articlesInfo.addContainerToDOM();
        // Рендер контейнера с сохраненными статьями
        searcher.addContainerToDOM('cards-container');
        searcher.addCards();
        break;
      case false:
        // Рендер информации о сохраненных статьях
        articlesInfo.addContainerToDOM();
        // Без него выглядит некрасиво, а в макете инфы нет
        searcher.addContainerToDOM('not-found-container');
    }
  });


// Слушатели
document.addEventListener('click', (event) => {
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

  // Логаут десктоп
  if (event.target.id === 'logout-button' || event.target.id === 'logout-image') {
    api.signOut().then(() => {
      document.location.href = './index.html';
    });
  }

  // Логаут мобильная версия
  if (event.target.id === 'mobile-logout-button' || event.target.id === 'mobile-logout-image') {
    api.signOut().then(() => {
      document.location.href = './index.html';
    });
  }

  // Покзаать еще
  if (event.target.classList.contains('cards-container__button')) {
    searcher.addCards();
  }

  // Удалить карточку
  if (event.target.classList.contains('card__button_delete')) {
    event.preventDefault();
    api.deleteArticle(event.target.id)
      .then(() => {
        articlesInfo.removeContainerFromDOM();
        articlesInfo.removeFromMyArticles(event.target.id);
        articlesInfo.addContainerToDOM();
        event.target.closest('.card').remove();
        if (articlesInfo.numberOfSavedArticles() === 0) {
          searcher.removeContainerFromDOM('cards-container');
          searcher.addContainerToDOM('not-found-container');
        }
      });
  }
});
