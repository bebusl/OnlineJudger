import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import useInfiniteScroll from "../../hooks/useIntersectionObserver";
import Table from "../common/Table/Table";
import { Submission } from "../../api/scheme/submissions";
import Link from "next/link";

function Ranking({ problemId }: { problemId?: number }) {
  const [body, setBody] = useState<Submission[]>([]);
  const [page, setPage] = useState(0);
  const pageLimit = useRef<number>(1);
  const onIntersectionCallback = () => {
    if (page < pageLimit.current - 1) setPage((prev) => prev + 1);
  };
  const { targetRef } = useInfiniteScroll({ onIntersectionCallback });

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

  useEffect(() => {
    (async () => {
      const result = await getSubmissionsByQuery({
        problem_id: problemId,
        is_ranking: true,
        page: page,
      });
      if (result.data?.success) {
        pageLimit.current = result.data.page.total_pages;
        let submissions = result.data?.submissions || [];
        submissions.map((submission) => {
          return Object.assign(submission, {
            problem_id: (
              <Link href={`/solution/${submission.id}`}>
                <p>{submission.problem_id}</p>
              </Link>
            ),
          });
        });
        setBody((prev) => [...prev, ...submissions]);
      }
    })();
  }, [page]);

  return (
    <>
      {!!body.length ? (
        <Table header={header} body={body} />
      ) : (
        <div>제출된 풀이법이 없습니다.</div>
      )}

      <div style={{ height: "1px" }} ref={targetRef} />
    </>
  );
}

export default Ranking;
