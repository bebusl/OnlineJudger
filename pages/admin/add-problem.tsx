import React from "react";
import useNotification from "../../hooks/useNotification";

import { registerProblem } from "../../api/problemsAPI";

import ProblemForm from "../../components/unit/problem/problemForm/ProblemForm";

function AddProblem() {
  const addNotification = useNotification();

  const handleSubmit = (data: FormData) => {
    registerProblem(data)
      .then((data) => {
        if (data.data.success) {
          addNotification("문제등록을 성공했습니다.", "success");
        } else {
          addNotification(data.data.err_msg, "error");
        }
      })
      .catch((e) => {
        addNotification("문제등록에 실패했습니다.", "error");
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
//ProblemForm   validation 무족건 추가~@

export default AddProblem;
