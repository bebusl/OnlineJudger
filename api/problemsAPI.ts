import request from "./request";
import { LANGUAGES } from "../constants/language";
import { makeAuthHeader } from "../utils/authUtils";

const { get, post, deleteRequest, putRequest } = request("/problems");

interface problemProps {
  page: string;
  title?: string;
  languages?: LANGUAGES | LANGUAGES[];
  tags?: number | number[];
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
