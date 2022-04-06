const axios = require("axios");

export default class WorkspaceService {
  static async fetchAllWorkspaces(userToken, params) {
    try {
      console.log(process.env.VUE_APP_HOST_API);
      const response = await axios.get(
        params
          ? `${process.env.VUE_APP_HOST_API}/workspaces${params}`
          : `${process.env.VUE_APP_HOST_API}/workspaces`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}