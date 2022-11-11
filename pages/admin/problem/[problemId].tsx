import React, { useState } from "react";

import type { InferGetServerSidePropsType, NextPageContext } from "next";
import { getProblemDetail, modifyProblem } from "../../../api/problemsAPI";
import useNotification from "../../../hooks/useNotification";
import ProblemForm from "../../../components/templates/ProblemForm";
import { Button } from "../../../components/common";

function ProblemDetail({
  id,
  ...data
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [readOnly, setReadOnly] = useState(true);

  const addNotification = useNotification();
  const handleSubmit = (data: FormData) => {
    modifyProblem(id, data).then((data) => {
      if (data.data.success) {
        addNotification("문제수정을 성공했습니다.", "success");
        setReadOnly(true);
      }
    });
  };

  return (
    <section>
      <h1>문제 보기/수정</h1>
      {readOnly ? (
        <p style={{ color: "red" }}>
          수정하려면 하단의 &apos;수정하기&apos;버튼을 눌러주세요
        </p>
      ) : (
        <p style={{ color: "blue" }}>수정 가능한 상태입니다.</p>
      )}
      <ProblemForm
        readOnly={readOnly}
        handleSubmit={handleSubmit}
        submitButtonText="문제 등록"
        {...data}
      />
      {readOnly && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            setReadOnly(false);
          }}
        >
          수정하기
        </Button>
      )}
    </section>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { problemId } = ctx.query;

  const response = await getProblemDetail(problemId as string);
  if (response.data.success) {
    return {
      props: {
        id: problemId,
        ...response.data,
      },
    };
  }
  return {
    notFound: true,
  };
}

export default ProblemDetail;

ProblemDetail.defaultProps = {
  adminOnly: true,
};
