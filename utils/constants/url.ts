export type METHOD = "get" | "post" | "delete";

export const ACCESS_TOKEN = "accessToken";
export const LINK_KEY = "linkKey";

export const API_BASE_URL = "https://online-judge-api.yoonleeverse.com";
export const WEB_SOCKET_URL = "https://online-judge-api.yoonleeverse.com/ws";

const WEB_REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_BASE_URL;

export const OAUTH2_REGISTER_REDIRECT_URI =
  WEB_REDIRECT_URL + "oauth2/redirect";
export const OAUTH2_LINK_REDIRECT_URI =
  WEB_REDIRECT_URL + "oauth2/redirect/link";

export const GOOGLE_AUTH_REGISTER_URL =
  API_BASE_URL +
  "/oauth2/authorize/google?redirect_uri=" +
  OAUTH2_REGISTER_REDIRECT_URI;
export const KAKAO_AUTH_REGISTER_URL =
  API_BASE_URL +
  "/oauth2/authorize/kakao?redirect_uri=" +
  OAUTH2_REGISTER_REDIRECT_URI;

export const GOOGLE_AUTH_LINK_URL =
  API_BASE_URL +
  "/oauth2/authorize/google?redirect_uri=" +
  OAUTH2_LINK_REDIRECT_URI;

export const KAKAO_AUTH_LINK_URL =
  API_BASE_URL +
  "/oauth2/authorize/kakao?redirect_uri=" +
  OAUTH2_LINK_REDIRECT_URI;
