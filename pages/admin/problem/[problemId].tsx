import React, { MouseEventHandler, useState } from "react";
import type { NextPageContext } from "next";

import { getProblemDetail, modifyProblem } from "../../../api/problemsAPI";
import { GetProblemsResponse } from "../../../api/scheme/problem";

import useNotification from "../../../hooks/useNotification";

import ProblemForm from "../../../components/templates/ProblemForm";
import { Button } from "../../../components/common";

interface Props {
  id: string;
  data: GetProblemsResponse;
}

function ProblemDetail({ id, data }: Props) {
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

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setReadOnly(false);
  };

  return (
    <section style={{ width: "100%" }}>
      <h1>문제 보기/수정</h1>

      {readOnly ? (
        <p style={{ color: "red" }}>
          수정하려면 하단의 &apos;수정하기&apos;버튼을 눌러주세요
        </p>
      ) : (
        <p style={{ color: "blue" }}>수정 가능한 상태입니다.</p>
      )}

      {readOnly && <Button onClick={handleClick}>수정하기</Button>}

      <ProblemForm
        readOnly={readOnly}
        handleSubmit={handleSubmit}
        submitButtonText="문제 등록"
        {...data}
      />
    </section>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { problemId } = ctx.query;

  try {
    const response = await getProblemDetail(problemId as string);
    if (response.data?.success) {
      return {
        props: {
          id: problemId,
          data: response.data,
        },
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default ProblemDetail;

ProblemDetail.defaultProps = {
  adminOnly: true,
};
