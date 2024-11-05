import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const handleSuccess = (response) => {
  return response;
};

const handleError = (error) => {
  console.error(error);
  return Promise.reject(error);
};

client.interceptors.response.use(handleSuccess, handleError);

export const axiosGet = (...args) => {
  return client.get(...args);
};

export const axiosPost = (...args) => {
  return client.post(...args);
};

export const axiosPut = (...args) => {
  return client.put(...args);
};

export const axiosPatch = (...args) => {
  return client.patch(...args);
};

export const axiosDelete = (...args) => {
  return client.delete(...args);
};
