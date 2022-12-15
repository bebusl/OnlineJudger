import { secure } from "./fetchClient";
import { setAuthorizationCookie } from "../utils/authUtils";
import { RefreshTokenResponse } from "./scheme/auth";

const refreshAccessToken = async () => {
  const response = await secure.post<RefreshTokenResponse>("/users/refresh");
  if (response?.status === 200 && response.data?.success) {
    setAuthorizationCookie(response.data.access_token);
    return true;
  }
  return false;
};

export default refreshAccessToken;
