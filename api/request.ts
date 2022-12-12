import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/url";
import { generateAuthHeader, setAuthorizationCookie } from "../utils/authUtils";

interface GetRequestProps {
  url: string;
  config?: AxiosRequestConfig;
  callback?: Function;
  errorHandler?: Function;
}

interface PostRequestProps extends GetRequestProps {
  data?: unknown;
}

export default function request(
  url: string = "",
  config?: Omit<AxiosRequestConfig, "baseUrl">
) {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL + url,
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const {
        config,
        response: {
          data: { success, err_msg },
          status,
        },
      } = error;
      const originalRequest = config;
      if (!success && (status == 401 || err_msg?.includes("userPrincipal"))) {
        const response = await axios.post(
          API_BASE_URL + "/users/refresh",
          null,
          { withCredentials: true }
        );
        if (response?.status === 200 && response.data?.success) {
          setAuthorizationCookie(response.data.access_token);
        }
        originalRequest.headers = {
          Authorization: `Bearer ${response.data.access_token}`,
        };
        return axios(config);
      }
      return error;
    }
  );

  async function requestHandler(
    request: Function,
    callback: Function = (result: AxiosResponse) => {
      console.log("default ", result);
    },
    errorHandler: Function = (error: Error) => {
      console.log("error1", error);
    }
  ) {
    try {
      const result = await request();
      if (callback) callback(result);
      return result;
    } catch (error) {
      if (errorHandler) errorHandler(error);
      throw error;
    }
  }
  function get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig<T>,
    callback?: Function,
    errorHandler?: Function
  ): Promise<R> {
    const request = () => axiosInstance.get(url, config);
    return requestHandler(request, callback, errorHandler);
  }

  function post<T = unknown, R = AxiosResponse<T>>({
    url,
    data,
    config,
    callback,
    errorHandler,
  }: PostRequestProps): Promise<R> {
    const request = () => axiosInstance.post<T>(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }

  function deleteRequest<T = unknown, R = AxiosResponse<T>>(
    url: string,
    callback?: Function,
    errorHandler?: Function
  ): Promise<R> {
    const request = () =>
      axiosInstance.delete(url, { headers: generateAuthHeader() });
    return requestHandler(request, callback, errorHandler);
  }

  function putRequest<T = unknown, R = AxiosResponse<T>>({
    url,
    data,
    config,
    callback,
    errorHandler,
  }: PostRequestProps): Promise<R> {
    const request = () => axiosInstance.put(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }
  function patchRequest<T = unknown, R = AxiosResponse<T>>({
    url,
    data,
    config,
    callback,
    errorHandler,
  }: PostRequestProps): Promise<R> {
    const request = () => axiosInstance.put(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }

  return { get, post, deleteRequest, putRequest, patchRequest };
}
