import request from "./request";
import { makeAuthHeader } from "../utils/authUtils";
import {
  CheckUsedId,
  GetUserResponse,
  LinkKey,
  RefreshTokenResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SecessionResponse,
} from "../api/scheme/auth";
import { APIResponse } from "./scheme/common";

const { get, post, deleteRequest } = request("/users", {
  headers: makeAuthHeader(),
});

export const getUser = (Authorization?: string) => {
  if (Authorization) return get("", { headers: { Authorization } });
  else return get<GetUserResponse>("");
};

export const validateName = (name: string) => get<CheckUsedId>(`/name/${name}`);

export const signup = ({ name, id, password, link_key = "" }: SignUpRequest) =>
  post({
    url: "",
    data: {
      name,
      id,
      password,
      link_key,
    },
  });

export const login = ({ id, password, link_key }: SignInRequest) =>
  post<SignInResponse>({
    url: "/login",
    data: {
      id,
      password,
      link_key,
    },
  });

export const logout = () => post<APIResponse>({ url: "/logout" });

export const refresh = () => post<RefreshTokenResponse>({ url: "/refresh" });

export const linkOauth = (linkKey: LinkKey) =>
  get<APIResponse>(`/link/${linkKey}`);

export const secession = () => deleteRequest<SecessionResponse>("");
