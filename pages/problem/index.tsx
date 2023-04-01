import React, { useEffect, useState } from "react";
import { getProblems } from "../../api/problemsAPI";
import { GetProblemsResponse, ProblemDetail } from "../../api/scheme/problem";

import { FlexBox } from "../../components/common";
import Pagination from "../../components/common/Pagination";
import Table from "../../components/common/Table/Table";
import SearchFilter from "../../components/unit/search/SearchFilter";
import ProblemCard from "../../components/unit/problem/problemCard/ProblemCard";
import { useRouter } from "next/router";
import BannerCarousel from "../../components/unit/banner/BannerCarousel";
import UserStatus from "../../components/unit/user/UserStatus";
import MetaTags from "../../components/common/MetaTags";

const header = [{ field: "card", header: "문제" }];

const mappingCard = (problems: ProblemDetail[]) =>
  problems.map((problem, idx) => ({
    card: <ProblemCard key={idx} {...problem} />,
  }));

function ProblemList({ problems, page }: GetProblemsResponse) {
  const [body, setBody] = useState<{ card: JSX.Element }[]>(
    mappingCard(problems)
  );

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const result = await getProblems(router.query);
        if (result.data.success) {
          const { problems } = result.data;
          const rows = mappingCard(problems);
          setBody(rows);
        }
      } catch (e) {
        setBody([]);
      }
    })();
  }, [router.query]);

  const handleChangePage = (page: number) => {
    router.push(
      {
        pathname: "",
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <MetaTags
        title="문제 리스트 | YOONLEEVERSE OJ"
        description="코딩 테스트 대비. 문제를 풀다 막히면 다른 사람들의 풀이도 참고해보세요!"
        url="https://uni.yoonleeverse.com/problem?page=1"
      />
      <BannerCarousel />
      <FlexBox
        flexDirection="row"
        alignItems="start"
        style={{ width: "100%", minHeight: "100vh" }}
      >
        <FlexBox
          justifyContent="start"
          alignItems="start"
          style={{ minHeight: "30vh", flexGrow: 1 }}
        >
          <h1>문제 보기</h1>
          <SearchFilter />
          {body?.length ? (
            <div style={{ minHeight: "50vh" }}>
              <Table header={header} body={body} />
              <Pagination
                current_pages={page.current_pages}
                total_pages={page.total_pages}
                onChange={handleChangePage}
              />
            </div>
          ) : (
            <div style={{ minHeight: "50vh" }}>
              <p>조건에 맞는 문제가 없습니다. 필터를 수정해주세요</p>
            </div>
          )}
        </FlexBox>
        <div style={{ flexGrow: 1, paddingTop: "150px" }}>
          <UserStatus />
        </div>
      </FlexBox>
    </>
  );
}

export default ProblemList;

export async function getStaticProps() {
  try {
    const result = await getProblems({ page: 0 });
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
