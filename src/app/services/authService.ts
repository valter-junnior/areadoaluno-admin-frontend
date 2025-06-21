import { api } from "../config/axios";

const loginService = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

const logoutService = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
}

export { loginService, logoutService };
