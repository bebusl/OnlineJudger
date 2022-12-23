import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "../../hooks/useStore";

import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import { Submission } from "../../api/scheme/submissions";

import WithSideBar from "../../components/templates/WithSideBar";
import Table from "../../components/common/Table/Table";
import Pagination from "../../components/common/Pagination";
import { Button } from "../../components/common";

function SolveList() {
  const header = [
    { field: "problem_id", header: "ID" },
    { field: "memory", header: "메모리" },
    { field: "real_time", header: "실행시간" },
    { field: "language", header: "제출언어" },
    { field: "status", header: "상태" },
    { field: "created_at", header: "제출일시" },
  ];

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [page, setPage] = useState({ current_page: 0, total_pages: 0 });
  const { email } = useAppSelector((store) => store.auth);

  const fetchSubmissions = async (value: number) => {
    const result = await getSubmissionsByQuery({
      page: value,
      user_id: email,
    });
    if (result.data.success) {
      setSubmissions(result.data.submissions);
      setPage({
        current_page: result.data.page.current_pages,
        total_pages: result.data.page.total_pages,
      });
    }
  };

  useEffect(() => {
    fetchSubmissions(0);
  }, []);

  const body = submissions.map((submission) => {
    return Object.assign(submission, {
      problem_id: (
        <Link href={`/solution/${submission.id}`}>{submission.problem_id}</Link>
      ),
      created_at: new Date(
        submission.created_at.split(".")[0]
      ).toLocaleString(),
    });
  });
  return (
    <WithSideBar>
      <>
        <h2>해결한 문제들</h2>
        <Button
          $variant="outline"
          style={{ float: "right" }}
          onClick={() => fetchSubmissions(0)}
        >
          ↺업데이트
        </Button>
        {!!submissions?.length ? (
          <Table header={header} body={body} rowHeight={"80px"} />
        ) : (
          <div>해결한 문제가 없습니다</div>
        )}
        <Pagination
          current_pages={page.current_page}
          total_pages={page.total_pages}
          onChange={(value: number) => {
            fetchSubmissions(value);
            setPage({ current_page: value, total_pages: page.total_pages });
          }}
        />
      </>
    </WithSideBar>
  );
}

export default SolveList;

SolveList.defaultProps = {
  authRequired: true,
};
