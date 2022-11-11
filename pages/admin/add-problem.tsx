import React, { useState } from "react";
import { registerProblem } from "../../api/problemsAPI";
import ProblemForm from "../../components/templates/ProblemForm";
import { LANGUAGES } from "../../constants/language";
import useNotification from "../../hooks/useNotification";

function AddProblem() {
  const addNotification = useNotification();
  const handleSubmit = (data: FormData) => {
    registerProblem(data).then((data) => {
      if (data.data.success) {
        addNotification("문제등록을 성공했습니다.", "success");
      }
    });
  };

  return (
    <section>
      <h1>문제 등록</h1>
      <ProblemForm
        readOnly={false}
        handleSubmit={handleSubmit}
        submitButtonText="문제 등록"
      />
    </section>
  );
}

export default AddProblem;

interface ProblemDetail {
  title: string;
  tile_limit: number;
  memory_limit: number;
  desc: string;
  input_desc: string;
  output_desc: string;
  test_case_examples: { input: string; output: string }[];
  languages: LANGUAGES[];
  tags: string[];
}
