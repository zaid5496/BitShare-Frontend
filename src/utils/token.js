const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN);

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN);

export const setTokens = (
  access,
  refresh
) => {
  localStorage.setItem(
    ACCESS_TOKEN,
    access
  );

  localStorage.setItem(
    REFRESH_TOKEN,
    refresh
  );
};

export const setAccessToken = (
  access
) => {
  localStorage.setItem(
    ACCESS_TOKEN,
    access
  );
};

export const clearTokens = () => {
  localStorage.removeItem(
    ACCESS_TOKEN
  );

  localStorage.removeItem(
    REFRESH_TOKEN
  );
};