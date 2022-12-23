import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import type { NextPageContext } from "next";

import { getSubmissionsByQuery } from "../../../api/submissionsAPI";
import { Submission } from "../../../api/scheme/submissions";

const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

function SolvePage({
  submissions,
}: {
  pageInfo: { [key: string]: number | boolean };
  submissions: Submission[];
  problemId: number;
}) {
  return (
    <section>
      <h1></h1>
      {!submissions?.length ? (
        <p>제출한 코드가 없습니다.</p>
      ) : (
        <>
          {submissions.map((submission) => (
            <>
              <p>{submission.id}</p>
              <code>
                <pre>{submission.code}</pre>
              </code>
            </>
          ))}
        </>
      )}
    </section>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  ctx?.res?.setHeader("Cache-Control", "s-maxage=20, stale-while-revalidate");
  const { problemId } = ctx.query;

  if (problemId) {
    const result = await getSubmissionsByQuery({
      problem_id: +problemId,
    });

    if (result.data.success) {
      return {
        props: {
          pageId: problemId,
          pageInfo: result.data.page,
          submissions: result.data.submissions,
        },
      };
    }
  }
  return {
    props: {
      user: "TEST",
      problemInfo: {},
      submissions: [],
    },
  };
}
// } => client side rendering으로 하자!

export default SolvePage;

SolvePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
