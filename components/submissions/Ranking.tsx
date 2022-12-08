import React, { useEffect, useMemo, useRef, useState } from "react";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import useInfiniteScroll from "../../hooks/useIntersectionObserver";
import Table from "../common/Table/Table";
import Modal from "../common/Modal";
import ScrollBox from "../common/ScrollBox";

function Ranking({ problemId }: { problemId?: number }) {
  const [body, setBody] = useState<
    Record<string, string | number | JSX.Element>[]
  >([]);
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
        problemId,
        isRanking: true,
        page: page,
      });
      if (result.data?.success) {
        pageLimit.current = result.data.page.total_pages;
        setBody((prev) => [...prev, ...result.data?.submissions]);
      }
    })();
  }, [page]);

  return (
    <>
      <Table header={header} body={body} />
      <div style={{ height: "1px" }} ref={targetRef}></div>
    </>
  );
}

export function RankingModal({
  onClose,
  problemId,
}: {
  onClose: Function;
  problemId: number;
}) {
  return (
    <Modal onClose={onClose} title="문제 풀이">
      <ScrollBox>
        <Ranking problemId={problemId} />
      </ScrollBox>
    </Modal>
  );
}

export default Ranking;
