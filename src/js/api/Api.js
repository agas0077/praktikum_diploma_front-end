const { SIGNUPERROR } = require('../errors/api-errors');

export default class Api {
  constructor(serverAdress) {
    this.serverAdress = serverAdress;
  }

  signUp(credentials) {
    const { email, password, name } = credentials;
    console.log(email, password, name);
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
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) return res;
        return Promise.reject(res);
      })
      .catch((err) => {
        console.log(err);
        // TODO Потом надо будет сделать так, чтобы сообщение об ошибке появлялось над кнопкой
        alert(err.message);
      });
  }

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

  signOut() {
    return fetch(`${this.serverAdress}/signout`, {
      credentials: 'include',
    })
      .then((res) => res);
  }

  someGet() {
    return fetch(`${this.serverAdress}/users/me`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
}
