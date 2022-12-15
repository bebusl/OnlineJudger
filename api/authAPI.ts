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
import { secure, common } from "./fetchClient";

export const getUser = (Authorization?: string) => {
  if (Authorization)
    return common.get<GetUserResponse>("/users", {
      headers: { Authorization },
    });
  else return secure.get<GetUserResponse>("/users");
};

export const validateName = (name: string) =>
  common.get<CheckUsedId>(`/users/name/${name}`);

export const signup = (requestProps: Partial<SignUpRequest>) =>
  common.post<SignUpResponse>("/users", requestProps);

export const login = ({ email, password, link_key }: SignInRequest) =>
  common.post<SignInResponse>("/users/login", { email, password, link_key });

export const logout = () => secure.post<APIResponse>("/users/logout");

export const linkOauth = (linkKey: LinkKey) =>
  secure.get<APIResponse>(`/users/link/${linkKey}`);

export const deleteAccount = () => secure.delete<SecessionResponse>("/users");

export const verifyEmail = ({ code }: VerifyEmailRequest) =>
  common.get<VerifyEmailResponse>(`/users/verify/${code}`);

export const updatePassword = (requestProps: UpdatePasswordRequest) => {
  return secure.patch<UpdatePasswordResponse>("/users/password", requestProps);
};

export const sendResetPasswordEmailLink = (
  requestProps: SendResetPasswordEmailRequest
) => {
  return common.post<SendResetPasswordEmailResponse>(
    "/users/password/reset",
    requestProps
  );
};

export const resetPassword = (requestProps: ResetPasswordRequest) => {
  return common.patch<ResetPasswordResponse>(
    "/users/password/reset",
    requestProps
  );
};
