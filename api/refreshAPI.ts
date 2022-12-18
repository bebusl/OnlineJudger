import { secureFetch } from "./fetchClient";
import { setAuthorizationCookie } from "../utils/authUtils";
import { RefreshTokenResponse } from "./scheme/auth";
import store from "../store/store";
import { logoff } from "../store/slice/authSlice";

const refreshAccessToken = async () => {
  const response = await secureFetch.post<RefreshTokenResponse>(
    "/users/refresh"
  );
  if (response?.status === 200 && response.data?.success) {
    setAuthorizationCookie(response.data.access_token);
    return true;
  }
  store.dispatch(logoff());
  return false;
};

export default refreshAccessToken;
