class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _requestTemplate(endpoint, method, body) {
    return fetch(this.baseUrl + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
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
}

export default Api;
