import ApiClient from './ApiClient';

export default class WorkspaceService extends ApiClient {
  static findAll(userToken, params) {
    let url = params ? `workspaces${params}` : `workspaces`;

    return this.makeRequest('GET', url, null, {
      Authorization: `Bearer ${userToken}`
    });
  }

  static async create(userToken, data) {
    return this.makeRequest(
      'POST',
      `workspaces`,
      {
        name: data.name,
        logo: data.logo,
        color: data.color
      },
      {
        Authorization: `Bearer ${userToken}`
      }
    );
  }

  static async find(userToken, id) {
    return this.makeRequest('GET', `workspaces/${id}`, null, {
      Authorization: `Bearer ${userToken}`
    });
  }
}
