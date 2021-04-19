class Api {
  constructor({ baseURL }) {
    this._baseURL = baseURL;
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
    });
  }

  getUserInfo() {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
    });
  }

  updateUserInfo(formData) {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      })
    });
  }

  postCard(formData) {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    });
  }

  deleteCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this._getRequestResult(`${this._baseURL}/cards/likes/${card._id}`, {
        method: "DELETE",
      });
    } else {
      return this._getRequestResult(`${this._baseURL}/cards/likes/${card._id}`, {
        method: "PUT",
      });
    }
  }

  patchAvatar(image) {
    return this._getRequestResult(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: image.link
      })
    });
  }
}

const api = new Api({
  baseURL: "https://api.melkornwah.nomoredomains.icu"
});

export default api;
