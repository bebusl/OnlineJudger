export type METHOD = "get" | "post" | "delete";

export const ACCESS_TOKEN = "accessToken";
export const LINK_KEY = "linkKey";

export const API_BASE_URL = "https://online-judge-api.yoonleeverse.com";
export const OAUTH2_REDIRECT_URI = "http://localhost:3000/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/kakao?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;

// localhost http://localhost:3000/oauth2/redirect
