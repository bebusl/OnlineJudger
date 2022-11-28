import { NextPageContext } from "next";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { deleteProblem, getProblems } from "../../api/problemsAPI";
import { Button, Table } from "../../components/common";
import Pagination from "../../components/common/Pagination";
interface Props {
  header: string[];
  problems: Record<string, string | number>[];
  pageInfo: Record<string, number>;
}

function ManageProblem({ problems, pageInfo }: Props) {
  const [body, setBody] = useState(problems);
  const [selectedProblem, setSelectedProblem] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const newValue = problems.map((problem) => ({
      ...problem,
      title: <Link href={`/admin/problem/1`}>{problem.title}</Link>,
      languages: problem.languages.join(" "),
    }));
    setBody(newValue);
  }, []);

  const allProblemIds = useMemo(() => {
    return problems.map((problem) => problem.id as number);
  }, []);

  const isAllSelected = selectedProblem.size === allProblemIds.length;

  const deselectProblem = (id: number) => {
    setSelectedProblem((prev) => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
  };

  const selectProblem = (id: number) => {
    setSelectedProblem((prev) => {
      const copy = new Set(prev);
      copy.add(id);
      return copy;
    });
  };

  const handleAllSelectCheckBoxClick = () => {
    if (isAllSelected) setSelectedProblem(new Set());
    else setSelectedProblem(new Set(allProblemIds));
  };

  const handleCheckBoxClick = (id: number) => {
    if (selectedProblem.has(id)) deselectProblem(id);
    else selectProblem(id);
  };

  const header = [
    { field: "id", header: "ID" },
    { field: "title", header: "제목" },
    { field: "memory_limit", header: "메모리" },
    { field: "time_limit", header: "제한시간" },
    { field: "languages", header: "언어" },
  ];

  return (
    <section style={{ width: "100%" }}>
      <h1>문제 관리 페이지</h1>
      <Link href="admin/add-problem" passHref>
        <Button as="a">과목 추가하기</Button>
      </Link>
      <div>
        <Table header={header} body={body} />
      </div>
      <div>
        <Button
          onClick={async (e) => {
            const result = [];
            for (let number of selectedProblem) {
              result.push(deleteProblem(number));
            }
            const a = await Promise.all(result);
            console.log(a);
          }}
        >
          선택한 {selectedProblem.size}개 삭제
        </Button>
      </div>
      <Pagination
        route="/admin"
        current_pages={pageInfo.current_pages}
        total_pages={pageInfo.total_pages}
      />
    </section>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { page } = ctx.query;
  if (page) {
    const result = await getProblems({ page: page as string });
    const { page: pageInfo, problems } = result.data;

    return {
      props: {
        problems,
        pageInfo,
      },
    };
  }
}

export default ManageProblem;

ManageProblem.defaultProps = {
  adminOnly: true,
};
