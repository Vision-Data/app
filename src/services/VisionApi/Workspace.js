const axios = require("axios");

import formatErrors from "./errors";

export default class WorkspaceService {
  static async findAll(userToken, params) {
    let response = null;
    let errors = null;

    try {
      response = await axios.get(
        params ? `workspaces${params}` : `workspaces`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }
  static async create(userToken, params) {
    let response = null;
    let errors = null;

    try {
      response = await axios.get(
        params ? `workspaces/create${params}` : `workspaces/create`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }
}
