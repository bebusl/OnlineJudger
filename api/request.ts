import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/url";
import { makeAuthHeader } from "../utils/authUtils";

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
  function get(
    url: string,
    config?: AxiosRequestConfig,
    callback?: Function,
    errorHandler?: Function
  ) {
    const request = () => axiosInstance.get(url, config);
    return requestHandler(request, callback, errorHandler);
  }

  function post<T>({
    url,
    data,
    config,
    callback,
    errorHandler,
  }: PostRequestProps) {
    const request = () => axiosInstance.post<T>(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }

  function deleteRequest(
    url: string,
    callback?: Function,
    errorHandler?: Function
  ) {
    const request = () =>
      axiosInstance.delete(url, { headers: makeAuthHeader() });
    return requestHandler(request, callback, errorHandler);
  }

  function putRequest({
    url,
    data,
    config,
    callback,
    errorHandler,
  }: PostRequestProps) {
    const request = () => axiosInstance.put(url, data, config);
    return requestHandler(request, callback, errorHandler);
  }

  return { get, post, deleteRequest, putRequest };
}
