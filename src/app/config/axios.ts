import axios from "axios";
import { config } from "./config";
import { getToken } from "../utils/authUtils";

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

