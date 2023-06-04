class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // проверить, есть ли ошибка
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }

  // регистрация
  register(email, password) {
    console.log(email, password)
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkError(res));
  }

  // вход
  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    .then((res) => this._checkError(res));
  }

  // проверяем токен
  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => this._checkError(res));
  }

  // удалить куки
  logout() {
    return fetch(`${this._baseUrl}/sighout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => this._checkError(res));
  }
}



const auth = new Auth("https://api.a.stay.nomoredomains.rocks");
// const auth = new Auth('http://localhost:3000');
export default auth;