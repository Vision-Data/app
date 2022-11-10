import axios from 'axios';

const makeRequest = async (choice, query, body) => {
  let response;
  try {
    response = await axios({
      method: choice,
      url: query,
      data: body
    });
  } catch (error) {
    if (error.response) {
      response = error.response;
    }
  }

  return response;
};

export default makeRequest;
