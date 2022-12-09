import { LANGUAGES_TYPE } from "../../constants/language";
import { TagsType } from "../../constants/tag";
import { APIResponse } from "./common";
import { PagingResponse } from "./page";

export interface SubmitProblemResponse extends APIResponse {}

export interface AddProblemRequest {
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: { input: string; output: string }[];
  languages: LANGUAGES_TYPE[];
  tags: TagsType[];
}

export interface AddProblemResponse extends APIResponse {}

export interface GetProblemResponse extends APIResponse {
  id: number;
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: {
    input: string;
    output: string;
  }[];
  languages: LANGUAGES_TYPE[];
  tags: [
    {
      created_at: Date;
      updated_at: Date;
      id: number;
      name: string;
    }
  ];
}
export interface GetAllProblemRequest {
  page: number;
  title: string;
  languages: LANGUAGES_TYPE;
  tags: string[];
}

export interface GetAllProblemResponse extends APIResponse {
  page: PagingResponse;
  problems: GetProblemResponse;
}
