import Link from "next/link";
import React from "react";
import { Button, Table } from "../../components/common";
import WithSideBar from "../../components/templates/WithSideBar";

interface Props {
  header: string[];
  body: (string | number | JSX.Element)[][];
}

const mockHeader = ["id", "제목", "태그", ""];
const mockBody = [
  [
    10,
    "테스트1",
    "하이",
    <Link href="problem/10" key={10}>
      자세히보기
    </Link>,
  ],
  [
    12,
    "테스트1",
    "하이",
    <Link href="problem/12" key={12}>
      자세히보기
    </Link>,
  ],
  [
    15,
    "테스트1",
    "하이",
    <Link href="problem/15" key={15}>
      자세히보기
    </Link>,
  ],
  [
    16,
    "테스트1",
    "하이",
    <Link href="problem/16" key={16}>
      자세히보기
    </Link>,
  ],
];

function ManageProblem({ header = mockHeader, body = mockBody }: Props) {
  return (
    <>
      <h1>문제 관리 페이지</h1>
      <Button>과목 추가하기</Button>
      <div>
        <Table header={header} body={body}></Table>
      </div>
      <div>
        <Button>선택 삭제</Button>
        <Button>전체 삭제</Button>
      </div>
    </>
  );
}

export default ManageProblem;

ManageProblem.defaultProps = {
  adminOnly: true,
};

const mock = {
  title: "Hello World",
  time_limit: 10000,
  memory_limit: 10000,
  desc: "첫번째 단어 입력시 Hello 첫번째 단어, 두번쨰 단어 입력시 Hello2 두번째 단어가 출력되게 하여라.",
  input_desc: "10자 이내의 단어가 엔터를 기준으로 두 번 입력된다.",
  output_desc:
    "첫번째 단어 입력시 Hello 첫번째 단어, 두번쨰 단어 입력시 Hello2 두번째 단어가 출력되어야 한다.",
  test_case_examples: [
    {
      input: "World\nWorld2\n",
      output: "Hello World\nHello2 World2\n",
    },
  ],
  languages: ["C"],
  tags: ["string"],
};
