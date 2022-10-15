import request from "./request";

const { post } = request("/submissions");

export const gradeProblem = async () =>
  await post({ url: "", data: { problem_id: 1, language: "C", code: "" } });
