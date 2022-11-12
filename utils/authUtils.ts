import Cookies from "js-cookie";

export const makeAuthHeader = () => {
  const auth_token = Cookies.get("Authorization") as string;
  return { Authorization: auth_token };
};
