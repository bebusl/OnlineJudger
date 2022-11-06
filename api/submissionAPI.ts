import request from "./request";

const { get, post } = request("/submissions");

export const gradeProblem = async () =>
  await post({ url: "", data: { problem_id: 1, language: "C", code: "" } });

export const getAllSubmissions = async (page: number, language?: string) => {
  const pageQuery = "page=" + page;
  const languageQuery = language ? "&language=" + language : "";
  const query = "?" + pageQuery + languageQuery;
  return await get(query);
};
//모든 제출 기록 가져오기(scoreboard), scoreboard는 모든 페이지 정보 다 들고와서 해야할 것 같음..!
//맨 첫번째 걸 먼저 들고옴. 1페이지 응답 => total_page저장되어 있음. => Promise.all안에 2페이지부터 total_page까지 결과를 다 가져옴 => data합쳐서 return

export const getSubmissionsByUserId = async (userId: string) =>
  await get(`?user_id=${userId}`);

//   page: 0,
//   problem_id: 1,
//   language: "C",
//   user_id: "test1234",
// };
