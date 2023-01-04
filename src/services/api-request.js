import axios from 'axios';

const makeRequest = async (choice, query, body) => {
  let response;
  try {
    response = await axios({
      method: choice,
      url: query,
      data: body,
      timeout: 10000,
    });
  } catch (error) {
    if (error.response) {
      response = error.response;
    }
  }

  return response;
};

export default makeRequest;
