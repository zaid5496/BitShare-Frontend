import api from "../api/axios";

export const getMyShares = async () => {
  const response = await api.get(
    "/share/my-links/"
  );

  return response.data;
};

export const createShareLink = async (
  payload
) => {
  const response = await api.post(
    "/share/create/",
    payload
  );

  return response.data;
};

export const revokeShareLink = async (
  token
) => {
  const response = await api.post(
    `/share/${token}/revoke/`
  );

  return response.data;
};

export const getShareInfo = async (
  token
) => {
  const response = await api.get(
    `/share/${token}/`
  );

  return response.data;
};

export const downloadSharedFile =
  async (token, password) => {
    const response =
      await api.get(
        `/share/${token}/download/`,
        {
          params: {
            password,
          },
          responseType:
            "blob",
        }
      );

    return response.data;
  };