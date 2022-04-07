import axios from "axios";
import formatErrors from "./errors";

export const signUp = async (data) => {
  let response = null;
  let errors = null;

  try {
    const result = await axios.post(`register`, data);
    response = result;
  } catch (apiErrors) {
    errors = formatErrors(apiErrors.response.data.errors);
  }

  return { response, errors };
};

export const login = async (data) => {
  let response = null;
  let errors = null;

  try {
    const result = await axios.post(`login`, data);
    response = result;
  } catch (apiErrors) {
    errors = formatErrors(apiErrors.response.data.errors);
  }

  return { response, errors };
};

export const logout = async (token) => {
  await axios.post(`logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
