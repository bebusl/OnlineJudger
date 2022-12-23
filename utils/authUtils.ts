import Cookies from "js-cookie";
import { addHours } from "./dateUtils";

export const getAuthToken = () => {
  const authToken = Cookies.get("Authorization") as string;
  return authToken;
};

export const setAuthorizationCookie = (accessToken: string) => {
  Cookies.set("Authorization", `Bearer ${accessToken}`, {
    secure: true,
    sameSite: "Strict",
    expires: addHours(1),
  });
};

export const removeAuthorizationCookie = () => {
  Cookies.remove("Authorization");
};
