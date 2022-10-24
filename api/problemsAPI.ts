import request from "./request";

const { get, post, deleteRequest, putRequest } = request("/problems");

export const deleteProblem = async (id: string) =>
  await deleteRequest(`/${id}`);

export const getProblemDetail = async (id: string) => await get(`/${id}`);

export const getProblems = async () => await get("");

export const registerProblem = async () => await post({ url: "" });

export const modifyProblem = async (id: number) => await putRequest(`/${id}`);
