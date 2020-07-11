const { SIGNUPERROR } = require('../errors/api-errors');

export default class Api {
  constructor(serverAdress) {
    this.serverAdress = serverAdress;
  }

  isSigned() {
    fetch()
  }

  signUp(credentials) {
    const { email, password, name } = credentials;
    console.log(email, password, name);
    return fetch(`${this.serverAdress}/signup`, {
      method: 'POST',
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
    return fetch(`${this.serverAdress}/signin`, {
      method: 'POST',
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
        if (res.ok) {
          return {
            status: 1,
          };
        }
        return Promise.reject(res);
      })
      .catch((err) => ({
        status: 0,
        message: err.message,
      }));
  }
}
