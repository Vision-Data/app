import axios from "axios";
import formatErrors from "./errors";

export default class AuthenticationService {
  static async signUp(data) {
    let response = null;
    let errors = null;

    try {
      const result = await axios.post(`register`, data);
      response = result;
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }

  static async login(data) {
    let response = null;
    let errors = null;

    try {
      const result = await axios.post(`login`, data);
      response = result;
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }

  static async logout(token) {
    await axios.post(`logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
