import { api } from "../config/axios";

// GET
const getResourceService = async (endpoint: string, params?: any) => {
  const response = await api.get(endpoint, { params });
  return response.data.data;
};

// POST
const postResourceService = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response.data.data;
};

// PUT
const putResourceService = async (endpoint: string, data: any) => {
  const response = await api.put(endpoint, data);
  return response.data.data;
};

// DELETE
const deleteResourceService = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response.data.data;
};

export {
  getResourceService,
  postResourceService,
  putResourceService,
  deleteResourceService,
};
