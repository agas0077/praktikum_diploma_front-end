export default class NewsApi {
  constructor() {
    this.dateFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  }

  // Удаляет HTML из описаний статей
  _deleteHTMLFromText(text) {
    return text.replace(/<[^>]+>/g, '');
  }

  // Возвращает дату с которой надо искать новости
  _getFromDate() {
    let date = Date.now() - 604800000;
    date = new Date(date).toLocaleDateString('ru', this.dateFormatOptions).split('.');
    date = `${date[2]}-${date[1]}-${date[0]}`;
    return date;
  }

  // Возвращает дату по которую надо искать новости
  _getTodayDate() {
    let date = Date.now();
    date = new Date(date).toLocaleDateString('ru', this.dateFormatOptions).split('.');
    date = `${date[2]}-${date[1]}-${date[0]}`;
    return date;
  }

  // Возвращает массив новостей, полученных от API
  getNews(keyWord) {
    const url = 'https://praktikum.tk/news/v2/everything?'
          + `q=${keyWord}&`
          + `from=${this._getFromDate()}&`
          + `to=${this._getTodayDate()}&`
          + 'sortBy=popularity&'
          + 'pageSize=100&'
          + 'apiKey=04a502993549435f941d419aba969f0d';

    const req = new Request(url);

    return fetch(req)
      .then((res) => res.json())
      .then((res) => {
        res.articles.forEach((article) => {
          article.description = this._deleteHTMLFromText(article.description);
        });
        return res;
      })
      .then((res) => ({
        res,
        key: keyWord,
      }));
  }
}
