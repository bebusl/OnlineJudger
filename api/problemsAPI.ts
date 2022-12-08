import request from "./request";
import { LANGUAGES } from "../constants/language";
import { makeAuthHeader } from "../utils/authUtils";
import axios from "axios";

const { get, post, deleteRequest, putRequest } = request("/problems");

export type ProblemInfo = {
  success: boolean;
  err_msg: string;
  id: number;
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: [
    {
      input: string;
      output: string;
    }
  ];
  languages: LANGUAGES[];
  tags: [
    {
      created_at: Date;
      updated_at: Date;
      id: number;
      name: string;
    }
  ];
};

export type PageInfo = {
  total_elements: number;
  current_pages: number;
  total_pages: number;
  is_first: boolean;
  is_last: boolean;
};

export interface GetAllResponseType {
  success: boolean;
  err_msg: string;
  page: PageInfo;
  problems: ProblemInfo[];
}

export interface problemProps {
  page?: string | number;
  title?: string;
  languages?: LANGUAGES | LANGUAGES[];
  tags?: number | number[];
}

export const deleteProblem = async (id: number) =>
  await deleteRequest(`/${id}`);

export const deleteMultiProblems = async (ids: Set<number>) => {
  const problemWillDelete = Array.from(ids);
  const requests = problemWillDelete.map((problemId) =>
    deleteRequest(`/${problemId}`)
  );
  return axios.all(requests);
};

export const getProblemDetail = async (id: string) => await get(`/${id}`);

export const getProblems = async ({
  page = "1",
  title,
  languages = [],
  tags,
}: problemProps) => {
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

  return await get<GetAllResponseType>(
    defaultQuery + titleQuery + languagesQuery
  );
};

export const registerProblem = async (data: FormData) =>
  await post({
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

export const modifyProblem = async (id: number, data: FormData) =>
  await putRequest({
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
