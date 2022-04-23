import ApiClient from "./ApiClient";

export default class AuthenticationService extends ApiClient {
  static signUp(data) {
    return this.makeRequest("POST", `register`, data);
  }

  static login(data) {
    return this.makeRequest("POST", `login`, data);
  }

  static logout(token) {
    return this.makeRequest("POST", `logout`, null, {
      Authorization: `Bearer ${token}`,
    });
  }
}
