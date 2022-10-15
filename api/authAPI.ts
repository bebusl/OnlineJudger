import request from "./request";

const { get, post } = request("/users");

export const getUser = async () => await get("");

export const validateName = async (name: string) => await get(`/name/${name}`);

export const signup = async () => await post({ url: "" });

export const login = async () =>
  await post({
    url: "/login",
    data: {
      id: "test1234",
      password: "test1234",
      link_key: "",
    },
  });

export const logout = async () => await post({ url: "/logout" });

export const refresh = async () => await post({ url: "/refresh" });
