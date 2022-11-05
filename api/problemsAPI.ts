import request from "./request";
import { LANGUAGES } from "../constants/language";

const { get, post, deleteRequest, putRequest } = request("/problems");

interface problemProps {
  page: string;
  title?: string;
  languages?: LANGUAGES[];
  tags?: number[];
}

export const deleteProblem = async (id: string) =>
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

export const registerProblem = async () => await post({ url: "" });

export const modifyProblem = async (id: number) => await putRequest(`/${id}`);
