export default class Api {
  constructor(serverAdress) {
    this.serverAdress = serverAdress;
  }

  // Регистрация
  signUp(credentials) {
    const { email, password, name } = credentials;
    return fetch(`${this.serverAdress}/signup`, {
      method: 'POST',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) return res;
        return res.json();
      })
      .then((res) => {
        if (res.ok) return res;
        return Promise.reject(res);
      })
      .catch((err) => err.message);
  }

  // Вход
  signIn(credentials) {
    const { email, password } = credentials;
    return fetch('http://localhost:3000/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) return res;
        return res.json();
      })
      .then((res) => {
        if (res.ok) return res;
        return Promise.reject(res);
      })
      .catch((err) => err.message);
  }

  // Выход
  signOut() {
    return fetch(`${this.serverAdress}/signout`, {
      credentials: 'include',
    })
      .then((res) => res);
  }

  // Сохранение карточки
  saveArticle(articleObj) {
    console.log(articleObj)
    const {
      keyword, title, text, date, source, link, image,
    } = articleObj;
    return fetch(`${this.serverAdress}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    })
      .then((res) => res.json());
  }

  // Удаление карточки
  deleteArticle(articleId) {
    return fetch(`${this.serverAdress}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) return res;
        return res.json();
      });
  }

  // Получение сохраненных карточек
  getArticles() {
    return fetch(`${this.serverAdress}/articles/`, {
      credentials: 'include',
    })
      .then((res) => res.json());
  }
}
