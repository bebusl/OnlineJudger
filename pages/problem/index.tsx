import axios from "axios";
import { NextPageContext } from "next";
import React from "react";
import { getProblems } from "../../api/problemsAPI";
import { Table } from "../../components/common";
import ScrollBox from "../../components/common/ScrollBox";

interface ProblemProps {
  header: string[];
  body: (number | string)[][];
  test?: string;
}

const Error = () => <div>Error</div>;

function index({ header, body }: ProblemProps) {
  return (
    <React.Suspense fallback={<Error />}>
      <ScrollBox height="800px">
        <Table header={header} body={body} />
      </ScrollBox>
    </React.Suspense>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const result = await getProblems();
  const { page, problems } = result;

  const testHeader = [
    "제출번호",
    "ID",
    "문제",
    "결과",
    "메모리",
    "시간",
    "언어",
  ];
  const testBody = [];
  for (let i = 0; i < 50; i++) {
    testBody.push([100, 1023, "문제이름" + i, "right", 1010, 0, "C"]);
  }
  return {
    props: {
      header: testHeader,
      body: testBody,
    },
  };
}

/**
 * 
 * {
  "success": true,
  "err_msg": "string",
  "id": 0,
  "title": "string",
  "time_limit": 0,
  "memory_limit": 0,
  "desc": "string",
  "input_desc": "string",
  "output_desc": "string",
  "test_case_examples": [
    {
      "input": "World\nWorld2\n",
      "output": "Hello World\nHello2 World2\n"
    }
  ],
  "languages": [
    "C"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ]
}
 */

export default index;

index.requireAuth = true;
