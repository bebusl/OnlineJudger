import { LANGUAGES_TYPE } from "../../utils/constants/language";
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
  created_at: string;
  updated_at: string;
  code: string;
  code_length: number;
  like: number;
  liked: boolean;
  comments: Comment[];
}

export interface Comment {
  submission_id: string;
  content: string;
  user_id: string;
  created_at: Date;
}

export interface SubmitProblemRequest {
  problem_id: number;
  language: LANGUAGES_TYPE;
  code: string;
  judge: boolean;
}

export interface GetSubmissionRequest {
  page?: number;
  id?: string;
  problem_id?: number;
  language?: LANGUAGES_TYPE;
  user_id?: string;
  is_ranking?: boolean;
}

export interface GetSubmissionResponse extends APIResponse {
  page: PagingResponse;
  submissions: Submission[];
}

export interface LikeSubmissionRequest {
  submission_id: string;
}

export interface LikeSubmissionResponse extends APIResponse {}

export interface DeleteLikeSubmissionRequest {
  submission_id: string;
}

export interface DeleteLikeSubmissionResponse extends APIResponse {}

export interface GetLikedSubmissionListRequest {
  page: number;
}

export interface GetLikedSubmissionListResponse extends APIResponse {
  page: PagingResponse;
  likes: { submission_id: string; submission: Submission };
}

export interface WriteCommentRequest {
  submission_id: string;
  comment: string;
}

export interface WriteCommentResponse extends APIResponse {}

export interface EditCommentRequest {
  comment_id: string;
  content: string;
}

export interface EditCommentResponse extends APIResponse {}

export interface RemoveCommentRequest {
  comment_id: string;
}

export interface RemoveCommentResponse extends APIResponse {}

export interface GetMyCommentsRequest {
  page: number;
}

export interface GetMyCommentsResponse extends APIResponse {
  page: PagingResponse;
  comments: Comment[];
}
