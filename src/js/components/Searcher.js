const notFound = require('../../images/not-found_v1.png');
const defaultImg = require('../../images/defaultNewsImage.jpg');

export default class Searcher {
  constructor(card, allContainers) {
    this.allContainers = allContainers;
    this.articlesArr = '';
    this.keyWord = '';
    this.stoppedAtIndex = -1;
    this.numOfArticles = 0;
    this.card = card;
    this.createdCards = [];
    this.articlesToSave = [];
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

  renderCards() {
    let i = 0;
    while (i < 3 && this.stoppedAtIndex + 1 !== this.numOfArticles) {
      const item = this.articlesArr[this.stoppedAtIndex + 1];
      const params = [
        item.url,
        item.urlToImage ? item.urlToImage : defaultImg,
        this._transformDate(item.publishedAt),
        item.title,
        item.description,
        item.source.name,
      ];
      const card = this.card.renderCard(...params);
      this.createdCards.push(card);
      this.articlesToSave.push(params);
      this.stoppedAtIndex++;
      i++;
    }
  }

  addThreeCards() {
    this.renderCards();
    let i = this.stoppedAtIndex - 3 < 0 ? 0 : this.stoppedAtIndex - 2;
    while (i < this.stoppedAtIndex + 1) {
      document.querySelector('.cards-container__grid').insertAdjacentHTML('beforeend', this.createdCards[i]);
      i++;
    }
    this.hideAddMoreButton();
  }

  getDisplayedCards() {
    return {
      cards: this.articlesToSave,
      keyWord: this.keyWord,
    };
  }

  setInitialCondition(articlesArr, keyWord) {
    this.articlesArr = articlesArr;
    this.numOfArticles = articlesArr.length;
    this.keyWord = keyWord;
    this.stoppedAtIndex = -1;
    this.createdCards = [];
    this.articlesToSave = [];
    this.removeContainerFromDOM();
  }
}
