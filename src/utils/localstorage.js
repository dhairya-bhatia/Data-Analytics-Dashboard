const AUTH_TOKEN = "auth";

export const getTokenObj = () => JSON.parse(localStorage.getItem(AUTH_TOKEN));
export const getToken = () =>
  JSON.parse(localStorage.getItem(AUTH_TOKEN)).token;

export const setToken = (token) => {
  return localStorage.setItem(
    AUTH_TOKEN,
    JSON.stringify({ token, reqTime: new Date().getTime() })
  );
};

export const isTokenValid = () => {
  const tokenObj = getTokenObj();
  if (!tokenObj || !tokenObj.token) return false;
  return (new Date().getTime() - tokenObj.reqTime) / 3600000 < 24; //token is valid for 24 hours
};
