import axios from "axios";

export default class ApiClient {
  static async makeRequest(method, url, data = null, headers = null) {
    let response = null;
    let errors = null;

    try {
      response = await axios({
        method,
        url,
        data,
        headers,
      });
    } catch (apiErrors) {
      errors = this.formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }

  static formatErrors(errors) {
    const result = {};

    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        if (error["field"] === undefined) {
          result["message"] = error.message;
        } else {
          result[error.field] = error.message;
        }
      });
    }

    return result;
  }
}
