import React from "react";
import { NextPageContext } from "next";

import { getSubmissionsByQuery } from "../../api/submissionsAPI";

import Table from "../../components/common/Table/Table";
import Pagination from "../../components/common/Pagination";
import WithSideBar from "../../components/templates/WithSideBar";

function SolveList({
  body,
  pageInfo,
}: {
  body: Record<string, string | number | JSX.Element>[];
  pageInfo: { current_pages: number; total_pages: number };
}) {
  const header = [
    { field: "problem_id", header: "ID" },
    { field: "memory", header: "메모리" },
    { field: "real_time", header: "실행시간" },
    { field: "language", header: "제출언어" },
    { field: "status", header: "상태" },
    { field: "", header: "제출코드보기" },
  ];
  return (
    <WithSideBar>
      <>
        <h2>해결한 문제들</h2>
        <Table header={header} body={body} rowHeight={"80px"} />
        <Pagination {...pageInfo} route="user/problem" />
      </>
    </WithSideBar>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const result = await getSubmissionsByQuery({ userId: "test1234" });

  const pageInfo = {
    current_pages: result.data.page.current_pages,
    total_pages: result.data.page.total_pages,
  };

  const header = [
    { field: "id", header: "ID" },
    { field: "memory", header: "메모리" },
    { field: "real_time", header: "실행시간" },
    { field: "language", header: "제출언어" },
    { field: "status", header: "상태" },
    { field: "", header: "제출코드보기" },
  ];

  return {
    props: {
      header,
      body: result.data.submissions,
      pageInfo,
    },
  };
}

export default SolveList;

SolveList.defaultProps = {
  authRequired: true,
};
