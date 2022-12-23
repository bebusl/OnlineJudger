import {
  CheckUsedId,
  GetUserResponse,
  LinkKey,
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
  SignUpResponse,
} from "../api/scheme/auth";
import { APIResponse } from "./scheme/common";
import { secureFetch, commonFetch } from "./fetchClient";

export const getUser = (Authorization?: string) => {
  if (Authorization)
    return commonFetch.get<GetUserResponse>("/users", {
      headers: { Authorization },
    });
  else return secureFetch.get<GetUserResponse>("/users");
};

export const validateName = (name: string) =>
  commonFetch.get<CheckUsedId>(`/users/name/${name}`);

export const signup = (requestProps: Partial<SignUpRequest>) =>
  commonFetch.post<SignUpResponse>("/users", requestProps);

export const login = ({ email, password, link_key }: SignInRequest) =>
  commonFetch.post<SignInResponse>("/users/login", {
    email,
    password,
    link_key,
  });

export const logout = () => secureFetch.post<APIResponse>("/users/logout");

export const linkOauth = (linkKey: LinkKey) =>
  secureFetch.get<APIResponse>(`/users/link/${linkKey}`);

export const deleteAccount = () =>
  secureFetch.delete<SecessionResponse>("/users");

export const verifyEmail = ({ code }: VerifyEmailRequest) =>
  commonFetch.get<VerifyEmailResponse>(`/users/verify/${code}`);

export const updatePassword = (requestProps: UpdatePasswordRequest) => {
  return secureFetch.patch<UpdatePasswordResponse>(
    "/users/password",
    requestProps
  );
};

export const sendResetPasswordEmailLink = (
  requestProps: SendResetPasswordEmailRequest
) => {
  return commonFetch.post<SendResetPasswordEmailResponse>(
    "/users/password/reset",
    requestProps
  );
};

export const resetPassword = (requestProps: ResetPasswordRequest) => {
  return commonFetch.patch<ResetPasswordResponse>(
    "/users/password/reset",
    requestProps
  );
};
