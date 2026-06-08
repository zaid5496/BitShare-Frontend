import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
} from "../utils/token";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token =
      getAccessToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status ===
        401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh =
          getRefreshToken();

        const response =
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/`,
            {
              refresh,
            }
          );

        const newAccess =
          response.data.access;

        setAccessToken(
          newAccess
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(
          originalRequest
        );
      } catch {
        clearTokens();

        window.location.href =
          "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;