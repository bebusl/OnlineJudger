import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Submission } from "../../api/scheme/submissions";
import { Button } from "../../components/common";
import Table from "../../components/common/Table/Table";
import Tag from "../../components/common/Tag";
import SubmissionView from "../../components/templates/SubmissionView";

function UserSubmissions() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </Head>

      <section>
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
          alt="python icon"
          width="40px"
          height="40px"
        />
        <Tag style={{ backgroundColor: "#7cff7a" }}>SUCCESS</Tag>
        <h1>
          {example.user_id}님의 {example.problem_id}번 풀이
        </h1>

        <Link href={`/problem/${example.problem_id}`}>
          <Button $variant="outline">문제보러가기</Button>
        </Link>
        <SubmissionView
          code={example.code}
          submitInfo={[
            Object.assign(example, {
              created_at: new Date(
                example.created_at.split(".")[0]
              ).toLocaleString(),
            }),
          ]}
        />
      </section>
    </>
  );
}

export default UserSubmissions;
// 요청 응답 없을 경우 잘못된 페이지로 ㄱ ㄱ
const example: Submission = {
  id: "6392b9054000fb1cea396a8b",
  user_id: "test1234",
  problem_id: 3,
  language: "PYTHON3",
  status: "SUCCESS",
  memory: 0,
  real_time: 13,
  created_at: "2022-12-09T04:26:45.688",
  updated_at: "2022-12-09T04:26:45.794",
  code: 'a = input()\nb = input()\n\nprint("Hello "+a)\nprint("Hello2 "+b)',
  code_length: 61,
};
