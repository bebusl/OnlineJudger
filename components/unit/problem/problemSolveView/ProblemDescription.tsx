import React, { useContext } from "react";
import { ProblemDetail } from "../../../../api/scheme/problem";

import ScrollBox from "../../../common/ScrollBox";
import Table from "../../../common/Table/Table";
import { LogoIconMapper } from "../../../LanguageAsset";

function ProblemDescription({ problem }: { problem: ProblemDetail }) {
  const header = [
    { field: "timeLimit", header: "시간제한" },
    { field: "memoryLimit", header: "메모리제한" },
    { field: "language", header: "제출가능언어" },
  ];

  const body = [
    {
      timeLimit: problem.time_limit,
      memoryLimit: problem.memory_limit,
      language: (
        <>{problem.languages.map((language) => LogoIconMapper[language])}</>
      ),
    },
  ];

  return (
    <ScrollBox as="article">
      <h3>문제설명</h3>
      <p>{problem.desc}</p>
      <hr />
      <h3>제한사항</h3>
      <Table header={header} body={body}></Table>
      <hr />
      <h3>입출력 설명</h3>
      <h4>입력 설명</h4>
      <p>{problem.input_desc}</p>
      <h4>출력 설명</h4>
      <p>{problem.output_desc}</p>
      <Table
        header={[
          { field: "input", header: "입력예시" },
          { field: "output", header: "출력예시" },
        ]}
        body={problem.test_case_examples}
      />
    </ScrollBox>
  );
}

export default ProblemDescription;
