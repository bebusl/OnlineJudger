import { commonFetch, secureFetch } from "./fetchClient";
import {
  AddProblemResponse,
  GetProblemsRequest,
  GetProblemsResponse,
  GetProblemResponse,
} from "./scheme/problem";
import axios from "axios";
import { APIResponse } from "./scheme/common";

export const deleteProblem = (id: number) =>
  secureFetch.delete<APIResponse>(`/problems/${id}`);

export const deleteMultiProblems = (ids: Set<number>) => {
  const problemWillDelete = Array.from(ids);
  const requests = problemWillDelete.map((problemId) =>
    secureFetch.delete<APIResponse>(`/problems/${problemId}`)
  );
  return axios.all(requests);
};

export const getProblemDetail = (id: string) =>
  commonFetch.get<GetProblemResponse>(`/problems/${id}`);

export const getProblems = ({
  page = 1,
  title,
  languages = [],
  tags,
  levels,
}: Partial<GetProblemsRequest>) => {
  return commonFetch.get<GetProblemsResponse>("/problems", {
    params: {
      page,
      title,
      languages,
      tags,
      levels,
    },
    paramsSerializer: { indexes: null },
  });
};

/**TEST. 잘 되나 */
export const registerProblem = (data: FormData) =>
  secureFetch.post<AddProblemResponse>("/problems", data, {
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });

/**TEST. 잘 되나 */
export const modifyProblem = (id: string, data: FormData) =>
  secureFetch.put<APIResponse>(`/problems/${id}`, data, {
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });
