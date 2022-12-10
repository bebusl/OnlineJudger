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
  VerifyEmailRequest,
  VerifyEmailResponse,
  SendResetPasswordEmailRequest,
  SendResetPasswordEmailResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../api/scheme/auth";
import { APIResponse } from "./scheme/common";
import axios from "axios";
import { API_BASE_URL } from "../constants/url";

const { get, post, deleteRequest, patchRequest } = request("/users", {
  headers: makeAuthHeader(),
});

export const getUser = (Authorization?: string) => {
  if (Authorization)
    return get<GetUserResponse>("", { headers: { Authorization } });
  else return get<GetUserResponse>("");
};

export const validateName = (name: string) => get<CheckUsedId>(`/name/${name}`);

export const signup = ({
  name,
  email,
  password,
  link_key = "",
}: SignUpRequest) =>
  post({
    url: "",
    data: {
      name,
      email,
      password,
      link_key,
    },
  });

export const login = ({ email, password, link_key }: SignInRequest) =>
  post<SignInResponse>({
    url: "/login",
    data: {
      email,
      password,
      link_key,
    },
  });

export const logout = () => post<APIResponse>({ url: "/logout" });

export const refresh = () => post<RefreshTokenResponse>({ url: "/refresh" });

export const linkOauth = (linkKey: LinkKey) =>
  get<APIResponse>(`/link/${linkKey}`);

export const secession = () => deleteRequest<SecessionResponse>("");

export const verifyEmail = ({ code }: VerifyEmailRequest) =>
  get<VerifyEmailResponse>(`/verify/${code}`);

export const sendResetPasswordEmailLink = (
  requestProps: SendResetPasswordEmailRequest
) => {
  // return axios.post<SendResetPasswordEmailResponse>(
  //   API_BASE_URL + "/users/password/reset?email=" + encodeURI(email)
  // );

  return axios.post<SendResetPasswordEmailResponse>(
    API_BASE_URL + "/users/password/resetPassword",
    requestProps
  );
};

export const updatePassword = (requestProps: UpdatePasswordRequest) => {
  return patchRequest<UpdatePasswordResponse>({
    url: "/password",
    data: requestProps,
  });
};

export const resetPassword = (requestProps: ResetPasswordRequest) => {
  // return axios.patch<ResetPasswordResponse>(
  //   API_BASE_URL +
  //     "/users/password/reset?code=" +
  //     requestProps.code +
  //     "&password=" +
  //     requestProps.password
  // );
  return axios.patch<ResetPasswordResponse>(
    API_BASE_URL + "/users/password/reset",
    requestProps
  );
};
