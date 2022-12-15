import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import Pagination from "../common/Pagination";
import Table from "../common/Table/Table";
import { Submission } from "../../api/scheme/submissions";

function Ranking({ problemId }: { problemId?: number }) {
  const [body, setBody] = useState<Submission[]>([]);
  const [page, setPage] = useState({ current_pages: 0, total_pages: 0 });
  const pageLimit = useRef<number>(1);

  const header = useMemo(
    () => [
      { field: "user_id", header: "유저" },
      { field: "problem_id", header: "문제번호" },
      { field: "language", header: "언어" },
      { field: "status", header: "채점상황" },
      { field: "memory", header: "메모리" },
      { field: "real_time", header: "소요 시간" },
      { field: "created_at", header: "제출일자" },
    ],
    []
  );

  const fetchSubmissions = async (page: number = 1) => {
    const result = await getSubmissionsByQuery({
      problem_id: problemId,
      is_ranking: true,
      page,
    });
    if (result.data?.success) {
      pageLimit.current = result.data.page.total_pages;
      let submissions = result.data?.submissions || [];
      submissions.map((submission) => {
        return Object.assign(submission, {
          problem_id: (
            <a
              href={`/solution/${submission.id}`}
              rel="noreferrer"
              target="_blank"
            >
              <p>{submission.problem_id}</p>
            </a>
          ),
        });
      });
      setBody(submissions);
      setPage({
        current_pages: result.data.page.current_pages,
        total_pages: result.data.page.total_pages,
      });
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <>
      {!!body.length ? (
        <>
          <Table header={header} body={body} />
          <Pagination
            {...page}
            onChange={(value: number) => {
              fetchSubmissions(value);
              setPage((prev) => ({
                current_pages: value,
                total_pages: prev.total_pages,
              }));
            }}
          />
        </>
      ) : (
        <div>제출된 풀이가 없습니다.</div>
      )}
    </>
  );
}

export default Ranking;
