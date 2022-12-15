import { common, secure } from "./fetchClient";
import { getAuthToken } from "../utils/authUtils";
import {
  AddProblemResponse,
  GetProblemsRequest,
  GetProblemsResponse,
  GetProblemResponse,
} from "./scheme/problem";
import axios from "axios";
import { APIResponse } from "./scheme/common";

export const deleteProblem = (id: number) =>
  secure.delete<APIResponse>(`/problems/${id}`);

export const deleteMultiProblems = (ids: Set<number>) => {
  const problemWillDelete = Array.from(ids);
  const requests = problemWillDelete.map((problemId) =>
    secure.delete<APIResponse>(`/problems/${problemId}`)
  );
  return axios.all(requests);
};

export const getProblemDetail = (id: string) =>
  common.get<GetProblemResponse>(`/problems/${id}`);

export const getProblems = ({
  page = 1,
  title,
  languages = [],
  tags,
  levels,
}: Partial<GetProblemsRequest>) => {
  return common.get<GetProblemsResponse>("/problems", {
    params: {
      page,
      title,
      languages,
      tags,
      levels,
    },
  });
};

/**TEST. 잘 되나 */
export const registerProblem = (data: FormData) =>
  secure.post<AddProblemResponse>("/problems", data, {
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });

/**TEST. 잘 되나 */
export const modifyProblem = (id: string, data: FormData) =>
  secure.put<APIResponse>(`/problems/${id}`, data, {
    headers: {
      accept: "*/*",
      "Content-Type": "multipart/form-data",
    },
  });
