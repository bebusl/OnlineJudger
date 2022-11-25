import request from "./request";
import { makeAuthHeader } from "../utils/authUtils";

const { get, post } = request("/users", { headers: makeAuthHeader() });

export const getUser = async (Authorization?: string) => {
  if (Authorization) return await get("", { headers: { Authorization } });
  else return await get("");
};

export const validateName = async (name: string) => await get(`/name/${name}`);

export const signup = async (
  name: string | undefined,
  id: string | undefined,
  password: string | undefined,
  link: string = ""
) =>
  await post({
    url: "",
    data: {
      name,
      id,
      password,
      link_key: link,
    },
  });

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

export const linkOauth = async (linkKey: string) =>
  await get(`/link/${linkKey}`);
