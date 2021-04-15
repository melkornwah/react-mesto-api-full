class Api {
  constructor({ baseURL, headers, credentials }) {
    this._baseURL = baseURL;
    this._headers = headers;
    this._credentials = credentials;
  }

  _getRequestResult(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }

  loadInitialCards() {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getUserInfo() {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  updateUserInfo(formData) {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      })
    });
  }

  postCard(formData) {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    });
  }

  deleteCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this._getRequestResult(`${this._baseURL}/cards/${card._id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: this._credentials,
      });
    } else {
      return this._getRequestResult(`${this._baseURL}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: this._credentials,
      });
    }
  }

  patchAvatar(image) {
    return this._getRequestResult(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: image.link
      })
    });
  }
}

const api = new Api({
  baseURL: "https://api.melkornwah.nomoredomains.icu",
  headers: {
    authorization: "f14a0855-c596-42e6-9cca-cb9c4d82767b",
    "Content-Type": "application/json"
  },
  credentials: 'include'
});

export default api;
