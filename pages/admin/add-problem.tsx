import React from "react";
import useNotification from "../../hooks/useNotification";

import { registerProblem } from "../../api/problemsAPI";

import ProblemForm from "../../components/templates/ProblemForm";

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
