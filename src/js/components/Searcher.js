import validator from 'validator';

import notFound from '../../images/not-found_v1.png'
import defaultImg from '../../images/defaultNewsImage.jpg'

export default class Searcher {
  constructor(cardClass, allContainers, page) {
    this.allContainers = allContainers;
    this.articlesArr = '';
    this.keyWord = '';
    this.stoppedAtIndex = -1;
    this.numOfArticles = 0;
    this.card = cardClass;
    this.createdCards = [];
    this.articlesToSave = [];
    this.page = page;
    this.cardsOnScreen = 0;
  }

  // Собирает контейнер для карточек
  _rednderCardsContainer() {
    return `
      <div class="cards-container">
        <h3 class="cards-container__title">Результаты поиска</h3>
        <div class="cards-container__grid cards-container__grid_with-button"></div>
        <button class="cards-container__button">Показать еще</button>
      </div>
    `;
  }

  // Изменяет формат даты
  _transformDate(dateToTransform) {
    let date = new Date(dateToTransform);
    date = date.toLocaleDateString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const dayAndMonth = date.match(/^\d{1,2}\s[а-я]*/);
    const year = date.match(/\d{4}/);
    date = `${dayAndMonth}, ${year}`;
    return date;
  }

  // Собирает прелоадер
  _renderPreloader() {
    return `
      <div class="preloader-container">
        <i class="circle-preloader"></i>
        <p class="preloader-container__title">Идет поиск новостей...</p>
      </div>
    `;
  }

  // Собирает контейнер "ничего не найдено"
  _renderNotFoundContainer() {
    return `
    <div class="not-found-container">
      <img src="${notFound}" alt="Ничего не было найдено">
      <h4 class="not-found-container__title">Ничего не найдено</h4>
      <p class="not-found-container__subtitle">
        ${this.page === 'main' ? 'К сожалению по вашему запросу ничего не найдено.' : 'К сожалению вы еще не сохранили ни одной статьи'}
      </p>
    </div>
    `;
  }

  // Собирает три карточки для основной страницы
  _renderThreeCards() {
    let i = 0;
    while (i < 3 && this.stoppedAtIndex + 1 !== this.numOfArticles) {
      const item = this.articlesArr[this.stoppedAtIndex + 1];
      const params = [
        item.url,
        validator.isURL(item.urlToImage ? item.urlToImage : '') ? item.urlToImage : defaultImg,
        this._transformDate(item.publishedAt),
        item.title,
        item.description,
        item.source.name,
        this.stoppedAtIndex + 1,
      ];
      const card = this.card.renderCard(...params);
      this.createdCards.push(card);
      this.articlesToSave.push(params);
      this.stoppedAtIndex++;
      i++;
    }
  }

  // Собирает сразу все карточки, которые сохранены пользователем
  _renderSavedCards() {
    let i = 0;
    while (i < this.numOfArticles && this.stoppedAtIndex + 1 !== this.numOfArticles) {
      const item = this.articlesArr[this.stoppedAtIndex + 1];
      const params = [
        item.link,
        item.image ? item.image : defaultImg,
        item.date,
        item.title,
        item.text,
        item.source,
        this.stoppedAtIndex + 1,
        item._id,
        item.keyword,
      ];
      const card = this.card.renderCard(...params);
      this.createdCards.push(card);
      this.stoppedAtIndex++;
      i++;
    }
  }

  // Убирает кнопку Показать еще
  hideAddMoreButton() {
    if (this.stoppedAtIndex + 1 >= this.numOfArticles) {
      const button = document.querySelector('.cards-container__button');
      if (button) {
        button.style.display = 'none';
      }
    }
  }

  // Добавляет указаный контейнер в DOM
  addContainerToDOM(container) {
    let whatToAdd;
    switch (container) {
      case 'cards-container':
        whatToAdd = this._rednderCardsContainer;
        break;

      case 'preloader-container':
        whatToAdd = this._renderPreloader;
        break;

      case 'not-found-container':
        whatToAdd = this._renderNotFoundContainer.bind(this);
        break;
    }
    document.querySelector('.body').insertAdjacentHTML(this.page === 'main' ? 'afterbegin' : 'beforeend', whatToAdd());
  }

  // Убирает указанный контейнер из DOM, если параметр не указан, удаляет все имеющиеся контейнеры
  removeContainerFromDOM(container) {
    if (container) {
      const cardsContaienr = document.querySelector(`.${container}`);
      if (cardsContaienr) {
        return cardsContaienr.remove();
      }
    }
    return this.allContainers.forEach((item) => {
      const cardsContaienr = document.querySelector(`.${item}`);
      if (cardsContaienr) {
        return cardsContaienr.remove();
      }
    });
  }

  // Добавляет в DOM нужное количество карточек в зависимости от страницы
  addCards() {
    if (this.page === 'main') {
      this._renderThreeCards();
    } else {
      this._renderSavedCards();
    }
    while (this.cardsOnScreen - 1 < this.stoppedAtIndex) {
      document.querySelector('.cards-container__grid').insertAdjacentHTML('beforeend', this.createdCards[this.cardsOnScreen]);
      this.cardsOnScreen++;
    }
    this.hideAddMoreButton();
  }

  // Устанавливает исходное состояние экземпляра класса
  setInitialState(articlesArr, keyWord) {
    this.articlesArr = articlesArr;
    this.numOfArticles = articlesArr.length;
    this.keyWord = keyWord;
    this.stoppedAtIndex = -1;
    this.createdCards = [];
    this.articlesToSave = [];
    this.cardsOnScreen = 0;
    this.removeContainerFromDOM();
  }

  // Получает необходимую информацию из карточки для отправки на сервер
  getArticleToSave(card) {
    const indexOfCard = card.id;
    const cardInfo = this.articlesToSave[indexOfCard];
    const infoToSave = {
      keyword: this.keyWord,
      title: cardInfo[3],
      text: cardInfo[4],
      date: cardInfo[2],
      source: cardInfo[5],
      link: cardInfo[0],
      image: cardInfo[1],
    };
    return infoToSave;
    // возможно определение индекса стоит вынести в класс searcher
  }

  // Сохраняет id БД сохраненной карточки
  saveArticleId(cardId, id) {
    this.articlesToSave[cardId].push(id);
  }

  // Возвращает id БД для удаления сохраненной карточки
  getArticleToDelete(card) {
    const cardId = card.id;
    return this.articlesToSave[cardId][7];
  }

  // Удаляет карточку из экземпляра класса после удаления на главной странице
  deleteCardFromArticlesToSave(card) {
    const cardId = card.id;
    const cardToDelete = this.articlesToSave[cardId][7];
    this.articlesToSave.forEach((item, index) => {
      if (this.articlesToSave[index][7] === cardToDelete) {
        this.articlesToSave[index].splice(7, 1);
      }
    });
  }
}
