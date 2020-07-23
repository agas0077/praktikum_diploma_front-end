export default class NewsApi {
  constructor() {
    this.dateFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  }

  _getFromDate() {
    let date = Date.now() - 604800000;
    date = new Date(date).toLocaleDateString('ru', this.dateFormatOptions).split('.');
    date = `${date[2]}-${date[1]}-${date[0]}`;
    return date;
  }

  _getTodayDate() {
    let date = Date.now();
    date = new Date(date).toLocaleDateString('ru', this.dateFormatOptions).split('.');
    date = `${date[2]}-${date[1]}-${date[0]}`;
    return date;
  }

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
      .then((res) => ({
        res,
        key: keyWord,
      }));
  }
}
