import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
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

export const commonFetch = AxiosFactory();

export const secureFetch = AxiosFactory({
  withCredentials: true,
});
secureFetch.interceptors.request.use((config) => {
  const authToken = getAuthToken();
  if (authToken) config.headers = { ...config.headers, Authorization: authToken };
  return config;
});
secureFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { data, status },
    } = error;
    if (status === 401) {
      const response = await refreshAPI();
      if (response) {
        config.headers = {
          ...config.headers,
          Authorization: Cookies.get("Authorization"),
        };
        return axios(config);
      }
      return error;
    }
  }
);
