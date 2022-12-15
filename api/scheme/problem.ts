import { LANGUAGES_TYPE } from "../../utils/constants/language";
import { TagsType } from "../../utils/constants/tag";
import { APIResponse } from "./common";
import { PagingResponse } from "./page";

export interface ProblemDetail {
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: { input: string; output: string }[];
  languages: LANGUAGES_TYPE[];
  tags: { id: number; name: TagsType }[];
  level: number;
  id: number;
}
export interface AddProblemRequest extends ProblemDetail {}

export interface AddProblemResponse extends APIResponse {}

export interface GetProblemsRequest {
  page: number;
  title?: string;
  languages?: LANGUAGES_TYPE[] | LANGUAGES_TYPE;
  tags?: number[] | number;
  levels?: number[] | number;
}
export interface GetProblemResponse extends APIResponse, ProblemDetail {}

export interface GetProblemsResponse extends APIResponse {
  page: PagingResponse;
  problems: GetProblemResponse[];
}
