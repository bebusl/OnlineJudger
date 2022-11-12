import { NextPageContext } from "next";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { deleteProblem, getProblems } from "../../api/problemsAPI";
import { Button, Table } from "../../components/common";
import Pagination from "../../components/common/Pagination";
interface Props {
  header: string[];
  problems: Record<string, string | number>[];
  pageInfo: Record<string, number>;
}

function ManageProblem({ problems, pageInfo }: Props) {
  const [selectedProblem, setSelectedProblem] = useState<Set<number>>(
    new Set()
  );

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
    <input
      type="checkbox"
      key={"headerCheckbox"}
      onClick={handleAllSelectCheckBoxClick}
      checked={selectedProblem.size === allProblemIds.length}
      readOnly
    />,
    "ID",
    "제목",
    "메모리",
    "시간",
    "언어",
  ];
  const body = problems.reduce(
    (pre: (string | number)[][], cur: Record<string, string | number>) => {
      const data = [
        <input
          type="checkbox"
          key={cur.id}
          defaultValue={cur.id}
          onClick={() => handleCheckBoxClick(cur.id as number)}
          checked={selectedProblem.has(cur.id)}
          readOnly
        />,
        cur.id,
        <Link href={`/admin/problem/${cur.id}`} key={cur.id}>
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
    <section style={{ width: "100%" }}>
      <h1>문제 관리 페이지</h1>
      <Link href="admin/add-problem" passHref>
        <Button as="a">과목 추가하기</Button>
      </Link>
      <div>
        <Table header={header} body={body}></Table>
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
    problems.sort((a, b) => (a.id > b.id ? 1 : -1));
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
