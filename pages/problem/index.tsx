import React, { useEffect, useState } from "react";
import type { NextPageContext } from "next";

import { getProblems } from "../../api/problemsAPI";
import { GetProblemsResponse } from "../../api/scheme/problem";

import { FlexBox } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table/Table";
import SearchFilter from "../../components/unit/search/SearchFilter";
import ProblemCard from "../../components/unit/problem/problemCard/ProblemCard";
import { useRouter } from "next/router";

const header = [{ field: "card", header: "문제" }];

export default function ProblemList({ problems, page }: GetProblemsResponse) {
  const [body, setBody] = useState<{ card: JSX.Element }[]>([]);
  const router = useRouter();
  useEffect(() => {
    const body = problems.map((problem, idx) => ({
      card: <ProblemCard key={idx} {...problem} />,
    }));
    setBody(body);
  }, []);

  return (
    <FlexBox
      justifyContent="start"
      alignItems="start"
      style={{ minHeight: "30vh", width: "100%", maxWidth: "900px" }}
    >
      <h1>문제 보기</h1>
      <SearchFilter />
      {body?.length ? (
        <>
          <Table header={header} body={body} />
          <Pagination
            current_pages={page.current_pages}
            total_pages={page.total_pages}
            onChange={(page: number) =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page },
              })
            }
          />
        </>
      ) : (
        <p>조건에 맞는 문제가 없습니다. 필터를 수정해주세요</p>
      )}
    </FlexBox>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  try {
    const result = await getProblems(ctx.query);
    if (result.data.success) {
      const { page, problems } = result.data;
      return {
        props: {
          problems,
          page,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        problems: [],
        page: null,
      },
    };
  }
}
