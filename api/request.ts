import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { stringify } from "querystring";
import { API_BASE_URL } from "../utils/constants/url";

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
    const request = () => axiosInstance.delete(url);
    return requestHandler(request, callback, errorHandler);
  }

  function putRequest(url: string) {
    const request = () => axiosInstance.put(url);
    return requestHandler(request);
  }

  return { get, post, deleteRequest, putRequest };
}
