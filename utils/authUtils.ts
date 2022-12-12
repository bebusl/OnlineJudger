import Cookies from "js-cookie";
import { addHours } from "./dateUtils";

export const generateAuthHeader = () => {
  const auth_token = Cookies.get("Authorization") as string;
  if (auth_token) return { Authorization: auth_token };
  return null;
};

export const setAuthorizationCookie = (accessToken: string) => {
  Cookies.set("Authorization", `Bearer ${accessToken}`, {
    secure: true,
    sameSite: "Strict",
    expires: addHours(1),
  });
};

export const removeAuthorizationCookie = () => {
  Cookies.remove("Authorization", {
    secure: false,
    sameSite: "Strict",
  });
};
