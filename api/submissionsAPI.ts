import { LANGUAGES_TYPE } from "../utils/constants/language";
import { secureFetch } from "./fetchClient";
import { APIResponse } from "./scheme/common";
import type {
  GetSubmissionRequest,
  GetSubmissionResponse,
  LikeSubmissionRequest,
  LikeSubmissionResponse,
  DeleteLikeSubmissionRequest,
  DeleteLikeSubmissionResponse,
  GetLikedSubmissionListRequest,
  GetLikedSubmissionListResponse,
  WriteCommentRequest,
  WriteCommentResponse,
  EditCommentRequest,
  EditCommentResponse,
  RemoveCommentRequest,
  RemoveCommentResponse,
  GetMyCommentsRequest,
  GetMyCommentsResponse,
} from "./scheme/submissions";

export const gradeProblem = (
  problemId: number,
  code: string,
  language: LANGUAGES_TYPE
) =>
  secureFetch.post<APIResponse>("/submissions", {
    problem_id: problemId,
    language,
    code,
    judge: true,
  });

export const runProblem = (
  problemId: number,
  code: string,
  language: LANGUAGES_TYPE
) =>
  secureFetch.post<APIResponse>("/submissions", {
    problem_id: problemId,
    language,
    code,
    judge: false,
  });

export const getSubmissionsByQuery = ({
  user_id,
  problem_id,
  language,
  page = 0,
  id,
  is_ranking = false,
}: GetSubmissionRequest) => {
  const params = {
    page,
    submission_id: id,
    user_id,
    problem_id,
    language,
    is_ranking,
  };
  return secureFetch.get<GetSubmissionResponse>("/submissions", { params });
};

export const likeSubmission = ({ submission_id }: LikeSubmissionRequest) => {
  return secureFetch.post<LikeSubmissionResponse>(
    `/submissions/like/${submission_id}`
  );
};

export const deleteLikeSubmission = ({
  submission_id,
}: DeleteLikeSubmissionRequest) => {
  return secureFetch.delete<DeleteLikeSubmissionResponse>(
    `/submissions/like/${submission_id}`
  );
};

export const getLikedSubmissionList = ({
  page,
}: GetLikedSubmissionListRequest) => {
  return secureFetch.get<GetLikedSubmissionListResponse>(`/submissions/like`, {
    params: { page },
  });
};

export const writeComment = (body: WriteCommentRequest) => {
  return secureFetch.post<WriteCommentResponse>("/submissions/comments", body);
};

export const editComment = (body: EditCommentRequest) => {
  return secureFetch.put<EditCommentResponse>("/submissions/comments", body);
};

export const removeComment = ({ comment_id }: RemoveCommentRequest) => {
  return secureFetch.delete<RemoveCommentResponse>(
    `/submissions/comments/${comment_id}`
  );
};

export const getMyComments = ({ page }: GetMyCommentsRequest) => {
  return secureFetch.get<GetMyCommentsResponse>("/submissions/comments", {
    params: { page },
  });
};
