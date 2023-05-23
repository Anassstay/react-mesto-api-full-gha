class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  getInitialData() {
    return fetch(`${this._baseUrl}/cards/`, {
        headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.name}`,
        about: `${data.info}`,
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      })
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/`+ _id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._getResponseData(res)
    })
  }

  changeLikeCardStatus(_id, isLiked) {
    return isLiked ? this.addLike(_id) : this.deleteLike(_id);
  }
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ac4d09bd-0b03-4641-a811-ed68f81bc835',
    'Content-Type': 'application/json'
  }
});

export default api;