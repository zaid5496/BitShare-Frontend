import api from "../api/axios";
import { ENDPOINTS } from "../api/endpoints";

export const loginUser = async (credentials) => {
  const response = await api.post(
    ENDPOINTS.LOGIN,
    credentials
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(
    ENDPOINTS.REGISTER,
    userData
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get(
    ENDPOINTS.ME
  );

  return response.data;
};


export const refreshToken = async (
  refresh
) => {
  const response = await api.post(
    ENDPOINTS.REFRESH,
    {
      refresh,
    }
  );

  return response.data;
};