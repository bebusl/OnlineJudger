import request from "./request";
import { LANGUAGES } from "../constants/language";
import { makeAuthHeader } from "../utils/authUtils";

const { get, post, deleteRequest, putRequest } = request("/problems");

interface problemProps {
  page: string;
  title?: string;
  languages?: LANGUAGES[];
  tags?: number[];
}

export const deleteProblem = async (id: number) =>
  await deleteRequest(`/${id}`);

export const getProblemDetail = async (id: string) => await get(`/${id}`);

export const getProblems = async ({
  page,
  title,
  languages = [],
  tags,
}: problemProps) => {
  const defaultQuery = "?page=" + page;
  const titleQuery = title ? `&title=${title}` : "";
  const languagesQuery =
    languages?.length > 0 ? `&languages=${languages[0]}` : "";

  return await get(defaultQuery + titleQuery + languagesQuery);
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
