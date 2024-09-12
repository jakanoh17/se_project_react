class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _requestTemplate(endpoint, method, body) {
    return fetch(this.baseUrl + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.token}`,
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

  postNewCard(newCard) {
    return this._requestTemplate("/items", "POST", newCard);
  }

  deleteCard(cardId) {
    return this._requestTemplate(`/items/${cardId}`, "DELETE");
  }

  getUserData() {
    return this._requestTemplate("/users/me", "GET");
  }

  editUserData({ name, avatar }) {
    return this._requestTemplate("/users/me", "PATCH", { name, avatar });
  }

  addCardLike(itemId) {
    return this._requestTemplate(`/items/${itemId}/likes`, "PUT");
  }

  removeCardLike(itemId) {
    return this._requestTemplate(`/items/${itemId}/likes`, "DELETE");
  }
}

export default Api;
