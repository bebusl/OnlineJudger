import React from "react";
import Link from "next/link";
import type { NextPageContext } from "next";

import { getProblems } from "../../api/problemsAPI";

import { Table } from "../../components/common";
import Pagination from "../../components/common/Pagination";

interface ProblemProps {
  header: string[];
  problems: Record<string, string | number>[];
  pageInfo: Record<string, number>;
}

const Error = () => <div>Error</div>;

function ProblemList({ header, problems, pageInfo }: ProblemProps) {
  console.log(problems);
  const body = problems.reduce(
    (pre: (string | number)[][], cur: Record<string, string | number>) => {
      const data = [
        cur.id,
        <Link href={`problem/${cur.id}`} key={cur.id}>
          {cur.title}
        </Link>,
        cur.memory_limit,
        cur.time_limit,
        cur.languages.join(" "),
      ];
      return [...pre, data];
    },
    []
  );
  return (
    <React.Suspense fallback={<Error />}>
      <Table header={header} body={body} />
      <Pagination
        route="problem"
        current_pages={pageInfo.current_pages}
        total_pages={pageInfo.total_pages}
      />
    </React.Suspense>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { page } = ctx.query;
  if (page) {
    const result = await getProblems({ page: page as string });
    const { page: pageInfo, problems } = result.data;
    const header = ["ID", "제목", "메모리", "시간", "언어"];
    problems.sort((a, b) => (a.id > b.id ? 1 : -1));
    // type 설정 안해줘서 빨간데,, 일단 그냥 뒀습니다.
    return {
      props: {
        header,
        problems,
        pageInfo,
      },
    };
  }
}

export default ProblemList;
