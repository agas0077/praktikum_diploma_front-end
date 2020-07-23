export default class ArticlesInfo {
  constructor(cookieClass) {
    this.cookie = cookieClass;
    this.myArticles = [];
    this.keywordArray = [];
  }

  // Возвращает все ключевые слова всех статей
  _getAllKeywords() {
    const allKeywordsCount = [];
    this.myArticles.forEach((article) => {
      allKeywordsCount.push(article.keyword);
    });
    return allKeywordsCount;
  }

  // Возвращает все уникальные ключевые слова в порядке убывания популярности
  _getSortedUniqueKeywords() {
    const allKeywordsCount = this._getAllKeywords();
    const counts = allKeywordsCount.reduce((prevVal, keyword) => {
      prevVal[keyword] = (prevVal[keyword] || 0) + 1;
      return prevVal;
    }, {});
    const keywordArray = Object.keys(counts);
    keywordArray.sort((a, b) => (counts[a] === counts[b]
      ? a.localeCompare(b)
      : counts[b] - counts[a]));
    return keywordArray;
  }

  // Определяет какой конкретно тескст и сколько span должен содержать контейнер
  _defineNumOfSpans() {
    this.keywordArray = this._getSortedUniqueKeywords();
    if (this.keywordArray.length === 3) {
      return `
        <span class="articles-info__key-words_bold">${this.keywordArray[0]}</span>
        ,
        <span class="articles-info__key-words_bold">${this.keywordArray[1]}</span>
        и
        <span class="articles-info__key-words_bold">${this.keywordArray[2]}</span>
      `;
    }
    if (this.keywordArray.length === 2) {
      return `
        <span class="articles-info__key-words_bold">${this.keywordArray[0]}</span>
        и
        <span class="articles-info__key-words_bold">${this.keywordArray[1]}</span>
      `;
    }
    if (this.keywordArray.length === 1) {
      return `
        <span class="articles-info__key-words_bold">${this.keywordArray[0]}</span>
      `;
    }
    return `
        <span class="articles-info__key-words_bold">${this.keywordArray[0]}</span>
        ,
        <span class="articles-info__key-words_bold">${this.keywordArray[1]}</span>
        и
        <span class="articles-info__key-words_bold">${this.keywordArray.length - 2} другим</span>
      `;
  }

  // Собирает контейнер с информацией о карточках
  _renderContainer() {
    const numberOfArticles = this.myArticles.length;
    return `
      <div class="articles-info">
        <p class="articles-info__subtitle">Сохраненные статьи</p>
        <h3 class="articles-info__title">${this.cookie.getACookieValue('name')}, у вас ${numberOfArticles} ${this.myArticles.length === 1 ? 'сохраненная статья' : 'сохраненных статей'}</h3>
        <p class="articles-info__key-words">${numberOfArticles === 1 ? 'По ключевому слову:' : 'По ключевым словам:'}
          ${this._defineNumOfSpans()}
        </p>
      </div>
    `;
  }

  // Собирает контейнер если сохраненные карточки отсутствуют
  _renderContainerIfEmpty() {
    return `
      <div class="articles-info">
        <p class="articles-info__subtitle">Сохраненные статьи</p>
        <h3 class="articles-info__title">${this.cookie.getACookieValue('name')}, у вас нет сохраненных статей</h3>
      </div>
    `;
  }

  // Сохраняет полученные сохраненные статьи пользователя в экземпляре класса
  setMyArticles(articles) {
    this.myArticles = articles;
  }

  // Удаление статьи из сохраненных в экземпляре класса статей
  removeFromMyArticles(articleId) {
    this.myArticles.forEach((article, indexOfArticle) => {
      if (article._id === articleId) {
        this.myArticles.splice(indexOfArticle, 1);
      }
    });
  }

  // Добавлене подходящего контейнера в DOM
  addContainerToDOM() {
    if (Array.isArray(this.myArticles) && this.numberOfSavedArticles() !== 0) {
      return document.querySelector('.body').insertAdjacentHTML('afterbegin', this._renderContainer());
    }
    return document.querySelector('.body').insertAdjacentHTML('afterbegin', this._renderContainerIfEmpty());
  }

  // Удаление контейнера из DOM
  removeContainerFromDOM() {
    document.querySelector('.articles-info').remove();
  }

  // Возвращает количество сохраненных в экземпляре класса карточек
  numberOfSavedArticles() {
    return this.myArticles.length;
  }
}
