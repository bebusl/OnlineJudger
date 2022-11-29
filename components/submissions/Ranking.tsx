import React, { useEffect, useMemo, useState } from "react";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import useInfiniteScroll from "../../hooks/useIntersectionObserver";
import { Table } from "../common";
import Modal from "../common/Modal";
import ScrollBox from "../common/ScrollBox";

function Ranking({
  onClose,
  problemId,
}: {
  onClose: Function;
  problemId: number;
}) {
  const onIntersectionCallback = () => {
    setPage((prev) => prev + 1);
  };
  const { targetRef } = useInfiniteScroll({ onIntersectionCallback });
  const [body, setBody] = useState<Record<string, unknown>[]>([]);
  const [page, setPage] = useState(0);

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
      });
      if (result.data?.success) {
        setBody((prev) => [...prev, ...result.data.submissions]);
      }
    })();
  }, [page]);

  return (
    <Modal onClose={onClose} title="문제 풀이">
      <ScrollBox>
        <Table header={header} body={body} />
        <div style={{ height: "1px" }} ref={targetRef}></div>
      </ScrollBox>
    </Modal>
  );
}

export default Ranking;
