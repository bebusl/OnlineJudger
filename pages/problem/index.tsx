import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPageContext } from "next";

import { getProblems } from "../../api/problemsAPI";

import { FlexBox } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import Popover from "../../components/common/Popover";
import Table from "../../components/common/Table";
import type { TableProps } from "../../components/common/Table";
import SearchFilter from "../../components/search/SearchFilter";

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

  return (
    <React.Suspense fallback={<Error />}>
      <SearchFilter />

      {body?.length ? (
        <>
          <Table header={header} body={body} />
          <Pagination
            route="problem"
            current_pages={pageInfo.current_pages}
            total_pages={pageInfo.total_pages}
          />
        </>
      ) : (
        <FlexBox style={{ minHeight: "80vh" }}>등록된 문제가 없습니다.</FlexBox>
      )}
    </React.Suspense>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { page, title, languages, tags } = ctx.query;
  const header = [
    { field: "id", header: "id" },
    { field: "title", header: "제목" },
    { field: "memory_limit", header: "메모리" },
    { field: "time_limit", header: "소요 시간" },
    { field: "languages", header: "언어" },
  ];

  if (page) {
    try {
      const result = await getProblems({
        page: page as string,
        title,
        languages,
        tags,
      });

      const { page: pageInfo, problems } = result.data;

      return {
        props: {
          header,
          problems,
          pageInfo,
        },
      };
    } catch (e) {
      return {
        props: {
          header,
          problems: [],
        },
      };
    }
  }
}

// export default ProblemList;
