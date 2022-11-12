import React, { ReactElement } from "react";
import dynamic from "next/dynamic";
import type { NextPageContext } from "next";
import { getSubmissionsByQuery } from "../../api/submissionsAPI";
import Pagination from "../../components/common/Pagination";
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

interface submissionResponse {
  user_id: string;
  problem_id: number;
  language: string;
  status: "SUCCESS" | "FALSE" | "PENDING";
  memory: number;
  real_time: number;
  created_at: string;
  updated_at: string;
  code_length: number;
  code: string;
}
function SolvePage({
  pageInfo,
  submissions,
  user,
}: {
  pageInfo: { [key: string]: number | boolean };
  submissions: submissionResponse[];
  user: string;
}) {
  return (
    <section>
      <h1>{user}님의 제출 이력</h1>
      {submissions.length === 0 ? (
        <p>제출한 코드가 없습니다.</p>
      ) : (
        <>
          {submissions.map((submission) => (
            <MonacoEditor
              options={{ readOnly: true }}
              key={submission.created_at}
              defaultValue={submission.code}
              width="80%"
              height="100vh"
            />
          ))}
        </>
      )}

      <Pagination route="/solution/6?user=test1234" {...pageInfo} />
    </section>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { user, problemId, page } = ctx.query;
  if (user && problemId) {
    const result = await getSubmissionsByQuery({
      userId: user as string,
      problemId: +problemId,
    });

    if (result.data.success && result.data.page.total_elements > 0) {
      return {
        props: {
          user: user,
          pageInfo: result.data.page,
          submissions: result.data.submissions,
        },
      };
    }
    return {
      notFound: true,
    };
  } else
    return {
      notFound: true,
    };
}

export default SolvePage;

SolvePage.defaultProps = {
  authRequired: true,
};

SolvePage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
