// Class to register and log users in.
// Used class as opposed to function so that I can restrict the required input a little better and pre-populate more info easier
class AuthorizeUser {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _requestTemplate(endpoint, method, body) {
    return fetch(this.baseUrl + endpoint, {
      method,
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

  loginUser({ email, password }) {
    return this._requestTemplate("/signin", "POST", { email, password });
  }

  registerUser({ username, avatar, email, password }) {
    return this._requestTemplate("/signup", "POST", {
      name: username,
      avatar,
      email,
      password,
    });
  }
}
export default AuthorizeUser;
