import { APIResponse } from "./common";
import { ROLEADMIN, ROLEUSER } from "../../constants/role";

export interface User {
  name: string;
  id: string;
  avatar_url: string;
  links: OAuthResponse;
  roles: typeof ROLEUSER | typeof ROLEADMIN;
}

export interface SignUpRequest {
  name: string;
  id: string;
  password: string;
  link_key: string;
}

export interface SignUpResponse extends APIResponse {
  access_token: string;
}

export interface LinkKey {
  link_key: string;
}

export interface OAuthResponse {
  provider: string;
  email: string;
  avatar_url: string;
}

export type SignInRequest = { id: string; password: string; link_key: string };

export interface SignInResponse extends APIResponse {
  access_token: string;
  user: User;
}

export interface RefreshTokenResponse extends APIResponse {
  aceees_token: string;
}

export interface CurrentUserResponse extends APIResponse {
  user: User;
}

export interface CheckUsedId extends APIResponse {}

export interface GetUserResponse extends APIResponse {
  user: User;
}

export interface SecessionResponse extends APIResponse {}
