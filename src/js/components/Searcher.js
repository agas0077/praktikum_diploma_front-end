import { all } from 'core-js/fn/promise';

const defaultImg = require('../../images/defaultNewsImage.jpg');
const notFound = require('../../images/not-found_v1.png');

export default class Searcher {
  constructor(allContainers) {
    this.allContainers = allContainers;
    this.articlesArr = '';
    this.keyWord = '';
    this.stoppedAtIndex = -1;
    this.numOfArticles = 0;
  }

  _rednderCardsContainer() {
    return `
      <div class="cards-container">
        <h3 class="cards-container__title">Результаты поиска</h3>
        <div class="cards-container__grid cards-container__grid_with-button"></div>
        <button class="cards-container__button">Показать еще</button>
      </div>
    `;
  }

  _renderCard(
    url,
    imgUrl,
    pubDate,
    title,
    description,
    source,
  ) {
    return `
      <a href="${url}" target="_blank" class="card">
        <div class="card__main-part">
          <input disabled type="checkbox" class="save-checkbox save-checkbox_add" id="checkbox{n}">
          <label for="checkbox{n}" class="save-checkbox__lable"></label>
          <div class="save-checkbox__message save-checkbox__message_show">Войдите, чтобы сохранить</div>

          <img class="card__image" src="${imgUrl}" alt="Изображение новости">
          <p class="card__date">${pubDate}</p>
          <h3 class="card__title">${title}</h3>
          <p class="card__text">${description}</p>
        </div>
        <p class="card__source">${source}</p>

      </a>
    `;
  }

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

  _renderCards() {
    const createdCards = [];
    let i = 0;
    while (i < 3 && this.stoppedAtIndex + 1 !== this.numOfArticles) {
      const item = this.articlesArr[this.stoppedAtIndex + 1];
      const card = this._renderCard(
        item.url,
        item.urlToImage ? item.urlToImage : defaultImg,
        this._transformDate(item.publishedAt),
        item.title,
        item.description,
        item.source.name,
      );
      createdCards.push(card);
      this.stoppedAtIndex++;
      i++;
    }
    return createdCards;
  }

  _renderPreloader() {
    return `
      <div class="preloader-container">
        <i class="circle-preloader"></i>
        <p class="preloader-container__title">Идет поиск новостей...</p>
      </div>
    `;
  }

  _renderNotFoundContainer() {
    return `
    <div class="not-found-container">
      <img src="${notFound}" alt="Ничего не было найдено">
      <h4 class="not-found-container__title">Ничего не найдено</h4>
      <p class="not-found-container__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
    </div>
    `;
  }

  hideAddMoreButton() {
    if (this.stoppedAtIndex + 1 >= this.numOfArticles) {
      const button = document.querySelector('.cards-container__button');
      if (button) {
        button.style.display = 'none';
      }
    }
  }

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
        whatToAdd = this._renderNotFoundContainer;
        break;
    }
    document.querySelector('.body').insertAdjacentHTML('afterbegin', whatToAdd());
  }

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

  addThreeCards() {
    const cardsArray = this._renderCards();
    cardsArray.forEach((i) => {
      document.querySelector('.cards-container__grid').insertAdjacentHTML('beforeend', i);
    });
    this.hideAddMoreButton();
  }

  setInitialCondition(articlesArr, keyWord) {
    this.articlesArr = articlesArr;
    this.numOfArticles = articlesArr.length;
    this.keyWord = keyWord;
    this.stoppedAtIndex = -1;
    this.removeContainerFromDOM();
  }
}
