import axios, { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../utils/constants/url";
import { getAuthToken } from "../utils/authUtils";
import refreshAPI from "./refreshAPI";

function AxiosFactory<T = any>(config: AxiosRequestConfig<T> = {}) {
  const baseConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
  };
  const axiosInstance = axios.create(Object.assign(baseConfig, config));

  return axiosInstance;
}
export const common = AxiosFactory();

export const secure = AxiosFactory({
  withCredentials: true,
});
secure.interceptors.request.use((config) => {
  const authToken = getAuthToken();
  if (authToken)
    config.headers = { ...config.headers, Authorization: authToken };
  return config;
});
secure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { data, status },
    } = error;
    if (status === 401 || data?.err_msg.includes("userPrincipal")) {
      const response = await refreshAPI();
      if (response) {
        config.headers = {
          ...config.headers,
          Authorization: getAuthToken(),
        };
        return axios(config);
      }
      return error;
    }
  }
);
