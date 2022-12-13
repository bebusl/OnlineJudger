import request from "./request";
import { generateAuthHeader } from "../utils/authUtils";
import {
  AddProblemResponse,
  GetProblemRequest,
  GetAllProblemResponse,
  GetProblemResponse,
} from "./scheme/problem";
import axios from "axios";
import { APIResponse } from "./scheme/common";

const { get, post, deleteRequest, putRequest } = request("/problems");

export const deleteProblem = (id: number) =>
  deleteRequest<APIResponse>(`/${id}`);

export const deleteMultiProblems = (ids: Set<number>) => {
  const problemWillDelete = Array.from(ids);
  const requests = problemWillDelete.map((problemId) =>
    deleteRequest<APIResponse>(`/${problemId}`)
  );
  return axios.all(requests);
};

export const getProblemDetail = (id: string) =>
  get<GetProblemResponse>(`/${id}`);

export const getProblems = ({
  page = 1,
  title,
  languages = [],
  tags,
  levels,
}: Partial<GetProblemRequest>) => {
  return get<GetAllProblemResponse>("", {
    params: {
      page,
      title,
      languages,
      tags,
      levels,
    },
  });
};

export const registerProblem = (data: FormData) =>
  post<AddProblemResponse>({
    url: "",
    data: data,
    config: {
      headers: {
        accept: "*/*",
        "Content-Type": "multipart/form-data",
        ...generateAuthHeader(),
      },
    },
  });

export const modifyProblem = (id: string, data: FormData) =>
  putRequest<APIResponse>({
    url: `/${id}`,
    data,
    config: {
      headers: {
        accept: "*/*",
        "Content-Type": "multipart/form-data",
        ...generateAuthHeader(),
      },
    },
  });
