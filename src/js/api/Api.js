export default class Api {
  constructor(serverAdress) {
    this.serverAdress = serverAdress;
  }

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
}
