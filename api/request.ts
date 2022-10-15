import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
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

export default function request(url: string = "") {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL + url,
  });

  async function requestHandler(
    request: Function,
    callback: Function = (result: AxiosResponse) => {
      console.log("default ", result);
    },
    errorHandler: Function = (error: Error) => {
      console.log("error", error);
    }
  ) {
    try {
      const result = await request();
      if (callback) callback(result);
      // console.log("HIHI", result);
      return result;
    } catch (error) {
      if (errorHandler) errorHandler();
      return error;
    }
  }
  async function get(
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

  return { get, post };
}
