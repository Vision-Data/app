import axios from 'axios';

const makeRequest = async (choice, query, body, abortController) => {
  let response;

  try {
    response = await axios({
      method: choice,
      url: query,
      data: body,
      timeout: 10000,
      signal: abortController.signal,
    });
  } catch (error) {
    if (error.response) {
      response = error.response;
    }
  }

  return response;
};

export default makeRequest;
