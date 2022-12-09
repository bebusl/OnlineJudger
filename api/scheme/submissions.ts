import { LANGUAGES_TYPE } from "../../constants/language";
import { APIResponse } from "./common";
import { PagingResponse } from "./page";

type SubmissionStatus =
  | "PENDING"
  | "WRONG_ANSWER"
  | "SUCCESS"
  | "CPU_TIME_LIMIT_EXCEEDED"
  | "REAL_TIME_LIMIT_EXCEEDED"
  | "MEMORY_LIMIT_EXCEEDED"
  | "RUNTIME_ERROR"
  | "SYSTEM_ERROR"
  | "INIT_EVN_ERROR"
  | "COMPILE_ERROR"
  | "JUDGE_ERROR"
  | "UNK_ERROR";

export interface Submission {
  id: string;
  user_id: string;
  problem_id: number;
  language: LANGUAGES_TYPE;
  status: SubmissionStatus;
  memory: number;
  real_time: number;
  create_at: string;
  updated_at: string;
  code: string;
  code_length: number;
}

export interface SubmitProblemRequest {
  problem_id: number;
  language: LANGUAGES_TYPE;
  code: string;
  judge: boolean;
}

export interface GetSubmissionRequest {
  page: number;
  problem_id: number;
  language: LANGUAGES_TYPE;
  user_id: string;
  is_ranking: boolean;
}

export interface GetSubmissionResponse extends APIResponse {
  page: PagingResponse;
  submissions: Submission[];
}
