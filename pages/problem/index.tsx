import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPageContext } from "next";

import { getProblems } from "../../api/problemsAPI";

import { FlexBox } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import Popover from "../../components/common/Popover";
import SearchBar from "../../components/common/SearchBar";
import Table from "../../components/common/Table";
import type { TableProps } from "../../components/common/Table";

interface ProblemProps extends TableProps {
  problems: Record<string, string | number | JSX.Element>[];
  pageInfo: Record<string, number>;
}

const Error = () => <div>Error</div>;

export default function ProblemList({
  header,
  problems,
  pageInfo,
}: ProblemProps) {
  const [popoverState, setPopOver] = useState<null | {
    top: number;
    left: number;
  }>(null);
  const [body, setBody] = useState(problems);

  useEffect(() => {
    const test = problems.map((problem) => ({
      ...problem,
      title: <Link href={`problem/${problem.id}`}>{problem.title}</Link>,
      languages: problem.languages?.join(" "),
    }));
    setBody(test);
  }, []); // problems를 useEffect안에서 말고 밖에서 조작하니까 hydration에러가 나서 이렇게 처리해줌.

  // const body = problems.map((problem) => ({
  //   ...problem,
  //   title: (
  //     <Link key={problem.title} href={`problem/${problem.id}`}>
  //       {problem.title}
  //     </Link>
  //   ),
  //   languages: problem.languages?.join(" "),
  // }));
  // const body = problems.reduce(
  //   (
  //     pre: (string | number | JSX.Element)[][],
  //     cur: Record<string, string | number | JSX.Element>
  //   ) => {
  //     const language_tag = (
  //       <div
  //         style={{ width: "100%", height: "100%" }}
  //         onMouseEnter={(e) => {
  //           const currentTarget = e.currentTarget;
  //           const clientRect = currentTarget.getBoundingClientRect();
  //           setPopOver({ top: clientRect.top, left: clientRect.left });
  //         }}
  //         onMouseLeave={(e) => {
  //           setPopOver(null);
  //         }}
  //       >
  //         {cur.languages.map((language) => (
  //           <Tag key={language}>{language}</Tag>
  //         ))}
  //       </div>
  //     );
  //     const data = [
  //       cur.id,
  //       <Link href={`problem/${cur.id}`} key={cur.id}>
  //         {cur.title}
  //       </Link>,
  //       cur.memory_limit,
  //       cur.time_limit,
  //       language_tag,
  //     ];
  //     return [...pre, data];
  //   },
  //   []
  // );
  return (
    <React.Suspense fallback={<Error />}>
      <SearchBar />

      {body?.length ? (
        <Table header={header} body={body} />
      ) : (
        <FlexBox style={{ minHeight: "90vh" }}>등록된 문제가 없습니다.</FlexBox>
      )}
      {popoverState && (
        <Popover top={popoverState.top} left={popoverState.left} />
      )}

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

    const header = [
      { field: "id", header: "id" },
      { field: "title", header: "제목" },
      { field: "memory_limit", header: "메모리" },
      { field: "time_limit", header: "소요 시간" },
      { field: "languages", header: "언어" },
    ];

    return {
      props: {
        header,
        problems,
        pageInfo,
      },
    };
  }
}

// export default ProblemList;
