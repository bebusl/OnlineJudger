import request from "./request";
import { makeAuthHeader } from "../utils/authUtils";
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
}: GetProblemRequest) => {
  const defaultQuery = "?page=" + page;
  const titleQuery = title ? `&title=${title}` : "";
  let languagesQuery = "";
  let tagsQuery = "";

  if (Array.isArray(languages)) {
    const key = "&languages=";
    languages.forEach((language) => (languagesQuery += key + language));
  }
  if (languages) languagesQuery = "&languages=" + languages;
  if (Array.isArray(tags)) {
    const key = "&tags=";
    tags.forEach((tag) => (tagsQuery += key + tag));
  }
  if (tags) tagsQuery = "&tags=" + languages;

  return get<GetAllProblemResponse>(defaultQuery + titleQuery + languagesQuery);
};

export const registerProblem = (data: FormData) =>
  post<AddProblemResponse>({
    url: "",
    data: data,
    config: {
      headers: {
        accept: "*/*",
        "Content-Type": "multipart/form-data",
        ...makeAuthHeader(),
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
        ...makeAuthHeader(),
      },
    },
  });
