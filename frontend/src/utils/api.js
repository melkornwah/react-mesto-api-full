class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
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
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      headers: this._headers
    });
  }

  updateUserInfo(formData) {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      }),
      headers: this._headers
    });
  }

  postCard(formData) {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      }),
      headers: this._headers
    });
  }

  deleteCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this._getRequestResult(`${this._baseURL}/cards/${card._id}/likes`, {
        method: "DELETE",
        headers: this._headers
      });
    } else {
      return this._getRequestResult(`${this._baseURL}/cards/${card._id}/likes`, {
        method: "PUT",
        headers: this._headers
      });
    }
  }

  patchAvatar(image) {
    return this._getRequestResult(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: image.link
      }),
      headers: this._headers
    });
  }
}

const api = new Api({
  baseURL: "https://api.melkornwah.nomoredomains.icu",
  headers: {
    "Authorization": `Bearer ${localStorage.jwt}`,
    "Content-Type": "application/json"
  }
});

export default api;
