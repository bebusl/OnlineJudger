import React from "react";
import { NextPageContext } from "next";

import { getSubmissionsByQuery } from "../../api/submissionsAPI";

import Table from "../../components/common/Table/Table";
import Pagination from "../../components/common/Pagination";
import WithSideBar from "../../components/templates/WithSideBar";
import { GetSubmissionResponse } from "../../api/scheme/submissions";
import Link from "next/link";

function SolveList({ submissions, page }: GetSubmissionResponse) {
  const header = [
    { field: "problem_id", header: "ID" },
    { field: "memory", header: "메모리" },
    { field: "real_time", header: "실행시간" },
    { field: "language", header: "제출언어" },
    { field: "status", header: "상태" },
    { field: "created_at", header: "제출일시" },
  ];

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
        {!!submissions?.length ? (
          <Table header={header} body={body} rowHeight={"80px"} />
        ) : (
          <div>해결한 문제가 없습니다</div>
        )}
        <Pagination {...page} route="user/problem" />
      </>
    </WithSideBar>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const result = await getSubmissionsByQuery({ user_id: "bbcbal12@gmail.com" });

  return {
    props: {
      page: result.data.page,
      submissions: result.data.submissions || [],
    },
  };
  // 응답 에러 처리해줄 것!
}

export default SolveList;

SolveList.defaultProps = {
  authRequired: true,
};
