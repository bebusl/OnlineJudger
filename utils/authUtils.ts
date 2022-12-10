import Cookies from "js-cookie";

export const makeAuthHeader = () => {
  const auth_token = Cookies.get("Authorization") as string;
  if (auth_token) return { Authorization: auth_token };
};
