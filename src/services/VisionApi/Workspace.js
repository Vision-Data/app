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

  static async create(userToken, data) {
    let response = null;
    let errors = null;

    try {
      response = await axios.post(
        `workspaces`,
        {
          name: data.name,
          logo: data.logo,
          color: data.color,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }

  static async find(userToken, id) {
    let response = null;
    let errors = null;

    try {
      response = await axios.get(`workspaces/${id}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
    } catch (apiErrors) {
      errors = formatErrors(apiErrors.response.data.errors);
    }

    return { response, errors };
  }
}
