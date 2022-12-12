import axios from "axios";
import { API_BASE_URL } from "../constants/url";
import { setAuthorizationCookie } from "../utils/authUtils";
import { RefreshTokenResponse } from "./scheme/auth";

const refreshAccessToken = async () => {
  const response = await axios.post<RefreshTokenResponse>(
    API_BASE_URL + "/users/refresh",
    null,
    {
      withCredentials: true,
    }
  );
  if (response?.status === 200 && response.data?.success) {
    setAuthorizationCookie(response.data.access_token);
    return true;
  }
  return false;
};

export default refreshAccessToken;
