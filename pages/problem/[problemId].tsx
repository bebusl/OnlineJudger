import React from "react";
import { NextPageContext } from "next";
import { getProblemDetail } from "../../api/problemsAPI";
import { JAVA, C, CPP, PYTHON2, PYTHON3 } from "../../constants/language";

interface ProblemDetailProps {
  id: number;
  title: string;
  time_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: Record<string, unknown>[];
  languages:
    | typeof JAVA
    | typeof C
    | typeof CPP
    | typeof PYTHON2
    | typeof PYTHON3;
}

function ProblemDetail({
  id,
  title,
  time_limit,
  memory_limit,
  desc,
  input_desc,
  output_desc,
  test_case_examples,
  languages,
}: ProblemDetailProps) {
  return <div>[problemId]</div>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { problemId } = ctx.query;
  if (problemId) {
    try {
      const problemDetail = await getProblemDetail(problemId as string);
      return {
        props: problemDetail.data,
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/problem",
          permanent: false,
        },
      };
    }
  }
}

export default ProblemDetail;
