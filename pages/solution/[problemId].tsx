import { NextPageContext } from "next";
import React, { ReactElement } from "react";
import { getSubmissionsByQuery } from "../../api/submissionAPI";
import Pagination from "../../components/common/Pagination";

function SolvePage({
  pageInfo,
  submissions,
}: {
  pageInfo: { [key: string]: number | boolean };
  submissions: Record<string, unknown>[];
}) {
  //   {
  //   user_id: 'test1234',
  //   problem_id: 6,
  //   language: 'C',
  //   status: 'SUCCESS',
  //   memory: 1,
  //   real_time: 0,
  //   created_at: '2022-11-05T05:43:07.326',
  //   updated_at: '2022-11-05T05:43:07.51',
  //   code_length: 232
  // },
  //아 아직 제출한 코드 보여주는 api가 없구나,,!
  return (
    <section>
      <h1>내가 푼 문제</h1>
      <p>여기에 editor readonly로 작성한 코드 보여줄것임!</p>
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
    console.log("SUBMISSIONS", result.data.submissions);
    if (result.data.success) {
      return {
        props: {
          pageInfo: result.data.page,
          submissions: result.data.submissions,
        },
      };
    }
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
