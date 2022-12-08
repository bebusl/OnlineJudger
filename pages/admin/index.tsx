import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  deleteMultiProblems,
  getProblems,
  PageInfo,
  ProblemInfo,
} from "../../api/problemsAPI";
import useNotification from "../../hooks/useNotification";

import Pagination from "../../components/common/Pagination";
import { Button } from "../../components/common";
import CheckableTable from "../../components/common/Table/CheckableTable";

const header = [
  { field: "id", header: "ID" },
  { field: "title", header: "제목" },
  { field: "memory_limit", header: "메모리" },
  { field: "time_limit", header: "제한시간" },
  { field: "languages", header: "언어" },
];

interface ProblemTableInfo extends Omit<ProblemInfo, "title" | "languages"> {
  title: string | JSX.Element;
  languages: string;
}

function ManageProblem() {
  const [problems, setProblems] = useState<ProblemTableInfo[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current_pages: 0,
    total_elements: 0,
    total_pages: 0,
    is_first: false,
    is_last: false,
  });
  const addNotification = useNotification();

  const fetchProblem = async () => {
    try {
      const res = await getProblems({ page: pageInfo.current_pages });
      const { page, problems } = res.data;

      const newValue = problems.map((problem) => ({
        ...problem,
        title: (
          <Link href={`/admin/problem/${problem.id}`}>{problem.title}</Link>
        ),
        languages: problem.languages.join(" "),
      }));
      setProblems(newValue);
      setPageInfo(page);
    } catch (e) {}
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const handleCheckedDataBtnClick = async (value) => {
    const responses = await deleteMultiProblems(value);
    const isErrorOccured = responses.some((response) => response.error);
    if (isErrorOccured)
      addNotification("일부 문제 삭제에 실패했습니다", "error");
    else addNotification("선택한 문제 삭제를 성공했습니다", "success");
    fetchProblem();
  };

  return (
    <section style={{ width: "100%" }}>
      <h1>문제 관리 페이지</h1>
      <Link href="admin/add-problem" passHref>
        <Button as="a">과목 추가하기</Button>
      </Link>
      <div>
        <CheckableTable
          header={header}
          body={problems}
          handleCheckedDataBtnClick={handleCheckedDataBtnClick}
          checkedDataBtnText="삭제"
        />
      </div>
      <Pagination route="/admin" {...pageInfo} />
    </section>
  );
}

export default ManageProblem;

ManageProblem.defaultProps = {
  adminOnly: true,
};
