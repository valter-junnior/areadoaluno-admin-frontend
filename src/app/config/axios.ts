import axios from "axios";
import { config } from "./config";
import { getToken } from "../utils/authUtils";
import { store } from "../store";
import { logout } from "../store/authSlice";

export const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

