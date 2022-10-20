import request from "./request";
import Cookies from "js-cookie";

const makeAuthorization = () => {
  const auth_token = Cookies.get("auth_token") as string;
  return { Authorization: auth_token };
};

const { get, post } = request("/users", { headers: makeAuthorization() });

export const getUser = async () => {
  return await get("");
};

export const validateName = async (name: string) => await get(`/name/${name}`);

export const signup = async () => await post({ url: "" });

export const login = async ({
  id,
  password,
  link_key = "",
}: {
  id: string;
  password: string;
  link_key?: string;
}) =>
  await post({
    url: "/login",
    data: {
      id,
      password,
      link_key,
    },
  });

export const logout = async () => await post({ url: "/logout" });

export const refresh = async () => await post({ url: "/refresh" });