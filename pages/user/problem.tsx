import { NextPageContext } from "next";
import Link from "next/link";
import React from "react";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import { Table } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import WithSideBar from "../../components/templates/WithSideBar";

function SolveList({
  header,
  body,
  pageInfo,
}: {
  header: string[];
  body: (string | number)[][];
  pageInfo: { current_pages: number; total_pages: number };
}) {
  const linkedBody = body.map((row) => [
    <Link href={`/solution/${row[0]}?user=test1234`} key={row[0]}>
      {row[0]}
    </Link>,
    ...row.slice(1),
  ]);
  return (
    <WithSideBar>
      <>
        <h2>해결한 문제들</h2>
        <Table header={header} body={linkedBody} />
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
  return {
    props: {
      header: [
        "문제번호",
        "메모리",
        "실행시간",
        "제출언어",
        "성공여부",
        "제출코드보기",
      ],
      body: [
        [6, 0, 0, "C", "SUCCESS", ""],
        [7, 1000, 1000, "C++", "FALSE", ""],
      ],
      pageInfo,
    },
  };
}

export default SolveList;

SolveList.defaultProps = {
  authRequired: true,
};
