import axios from "axios";
import store from "../../../store";
import { clearLock, setLock } from "../lock/lockSlice";

const { dispatch } = store;

const client = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const handleRequest = (config) => {
  if (store.getState().lockManager.isApiRequestPending) {
    return Promise.reject("Another request is pending");
  }

  dispatch(setLock());
  return config;
};

client.interceptors.request.use(handleRequest);

const handleSuccess = (response) => {
  dispatch(clearLock());
  return response;
};

const handleError = (error) => {
  dispatch(clearLock());
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
