import React, { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPageContext } from "next";

import { getProblems } from "../../api/problemsAPI";

import { FlexBox } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import Table, { TableProps } from "../../components/common/Table/Table";
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
  const [body, setBody] = useState(problems);

  useEffect(() => {
    const body = problems.map((problem) => ({
      ...problem,
      title: <Link href={`problem/${problem.id}`}>{problem.title}</Link>,
      languages: problem.languages?.join(" "),
    }));
    setBody(body);
  }, []);

  return (
    <React.Suspense fallback={<Error />}>
      <SearchFilter />

      {body?.length ? (
        <>
          <Table header={header} body={body} checkable />
          <Pagination
            route="problem"
            current_pages={pageInfo.current_pages}
            total_pages={pageInfo.total_pages}
          />
        </>
      ) : (
        <FlexBox style={{ minHeight: "30vh", width: "100%" }}>
          등록된 문제가 없습니다.
        </FlexBox>
      )}
    </React.Suspense>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { page, title, languages, tags } = ctx.query;
  const header = [
    { field: "id", header: "id", sortable: true },
    { field: "title", header: "제목" },
    { field: "memory_limit", header: "메모리" },
    { field: "time_limit", header: "소요 시간" },
    { field: "languages", header: "언어" },
  ];

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

// export default ProblemList;
