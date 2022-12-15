import { APIResponse } from "./common";
import { ROLEADMIN, ROLEUSER } from "../../utils/constants/role";

export interface User {
  name: string;
  id: string;
  avatar_url: string;
  links: OAuthResponse;
  roles: typeof ROLEUSER | typeof ROLEADMIN;
}

export type Code = string;

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  link_key: string;
}

export interface SignUpResponse extends APIResponse {
  access_token: string;
}

export type LinkKey = string;

export interface OAuthResponse {
  provider: string;
  email: string;
  avatar_url: string;
}

export type SignInRequest = {
  email?: string;
  password?: string;
  link_key?: string;
};

export interface SignInResponse extends APIResponse {
  access_token: string;
  user: User;
}

export interface RefreshTokenResponse extends APIResponse {
  access_token: string;
}

export interface CurrentUserResponse extends APIResponse {
  user: User;
}

export interface CheckUsedId extends APIResponse {}

export interface GetUserResponse extends APIResponse {
  user: User;
}

export interface SecessionResponse extends APIResponse {}

export interface VerifyEmailRequest {
  code: Code;
}

export interface VerifyEmailResponse extends APIResponse {}

export interface SendResetPasswordEmailRequest {
  email: string;
}

export interface SendResetPasswordEmailResponse extends APIResponse {}

export interface ResetPasswordRequest {
  code: string;
  password: string;
}
export interface ResetPasswordResponse extends APIResponse {}

export interface UpdatePasswordRequest {
  oldPassword: string;
  password: string;
}

export interface UpdatePasswordResponse extends APIResponse {}
