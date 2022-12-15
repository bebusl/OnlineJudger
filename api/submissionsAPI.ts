import { LANGUAGES_TYPE } from "../utils/constants/language";
import { secure } from "./fetchClient";
import { APIResponse } from "./scheme/common";
import type {
  GetSubmissionRequest,
  GetSubmissionResponse,
  LikeSubmissionRequest,
  LikeSubmissionResponse,
  DeleteLikeSubmissionRequest,
  DeleteLikeSubmissionResponse,
} from "./scheme/submissions";

export const gradeProblem = (
  problemId: number,
  code: string,
  language: LANGUAGES_TYPE
) =>
  secure.post<APIResponse>("/submissions", {
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
  secure.post<APIResponse>("/submissions", {
    problem_id: problemId,
    language,
    code,
    judge: false,
  });

// export const getAllSubmissions = (page: number, language?: string) => {
//   const params = { page, language };
//   const pageQuery = "page=" + page;
//   const languageQuery = language ? "&language=" + language : "";
//   const query = "?" + pageQuery + languageQuery;
//   return secure.get(query);
// };
//모든 제출 기록 가져오기(scoreboard), scoreboard는 모든 페이지 정보 다 들고와서 해야할 것 같음..!
//맨 첫번째 걸 먼저 들고옴. 1페이지 응답 => total_page저장되어 있음. => Promise.all안에 2페이지부터 total_page까지 결과를 다 가져옴 => data합쳐서 return

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
  // const pageQuery = "?page=" + page;
  // const submitIdQuery = id ? "&submission_id=" + id : "";
  // const userIdQuery = user_id ? "&user_id=" + user_id : "";
  // const problemIdQuery = problem_id ? "&problem_id=" + problem_id : "";
  // const languageQuery = language ? "&language=" + language : "";
  // const rankingQuery = is_ranking ? "&is_ranking=true" : "&is_ranking=false";
  // const query =
  //   pageQuery +
  //   userIdQuery +
  //   problemIdQuery +
  //   submitIdQuery +
  //   languageQuery +
  //   rankingQuery;
  return secure.get<GetSubmissionResponse>("/submissions", { params });
};

export const likeSubmission = ({ submission_id }: LikeSubmissionRequest) => {
  return secure.post<LikeSubmissionResponse>(
    `/submissions/like/${submission_id}`
  );
};

export const deleteLikeSubmission = ({
  submission_id,
}: DeleteLikeSubmissionRequest) => {
  return secure.delete<DeleteLikeSubmissionResponse>(
    `/submissions/like/${submission_id}`
  );
};
