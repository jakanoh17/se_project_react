class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _requestTemplate(endpoint, method, token, body) {
    return fetch(this.baseUrl + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCards() {
    return this._requestTemplate("/items", "GET");
  }

  postNewCard(token, newCard) {
    return this._requestTemplate("/items", "POST", token, newCard);
  }

  deleteCard(token, cardId) {
    return this._requestTemplate(`/items/${cardId}`, "DELETE", token);
  }

  getUserData(token) {
    return this._requestTemplate("/users/me", "GET", token);
  }

  editUserData(token, { name, avatar }) {
    return this._requestTemplate("/users/me", "PATCH", token, { name, avatar });
  }

  addCardLike(token, itemId) {
    return this._requestTemplate(`/items/${itemId}/likes`, "PUT", token);
  }

  removeCardLike(token, itemId) {
    return this._requestTemplate(`/items/${itemId}/likes`, "DELETE", token);
  }
}

export default Api;
