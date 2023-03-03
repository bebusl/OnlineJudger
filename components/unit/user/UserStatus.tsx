import React, { useEffect, useMemo, useState } from "react";
import * as S from "./UserStatus.style";
import SemiDonutChart from "../../common/Chart";
import { getSubmissionsByQuery } from "../../../api/submissionsAPI";
import { useAppSelector } from "../../../hooks/useStore";

function UserStatus() {
  const { isLogin, name, email } = useAppSelector((state) => state.auth);
  const [solvedProblem, setSolvedProblem] = useState([0, 0]);
  const guage =
    solvedProblem[1] === 0 ? 0 : (solvedProblem[0] / solvedProblem[1]) * 100;

  const comment = useMemo(() => {
    if (guage >= 80) return "대단해요!";
    else if (guage >= 60) return "고지가 눈앞이에요";
    else if (guage >= 30) return "이제 올라갈 일뿐이에요";
    return "시작이 어려운 법이에요";
  }, [guage]);

  useEffect(() => {
    (async () => {
      const result = await getSubmissionsByQuery({
        page: 0,
        user_id: email,
      });

      if (result.data.success) {
        const submissions = result.data.submissions;

        if (submissions?.length) {
          const successSubmissionsLength = submissions.filter(
            (submission) => submission.status === "SUCCESS"
          ).length;
          setSolvedProblem([successSubmissionsLength, submissions.length]);
        } else setSolvedProblem([0, 0]);
      }
    })();
  }, []);

  if (!isLogin)
    return (
      <S.Card>
        <p className="bold">문제를 풀어보려면 로그인을 해야해요!</p>
      </S.Card>
    );
  return (
    <S.Card>
      <section>
        <p className="bold xl">{name}님</p>
        <p className="m">{email}</p>
      </section>

      <p className="bold l">최근 문제 풀이 성공률</p>
      <SemiDonutChart guage={guage}>
        {solvedProblem[0]} / {solvedProblem[1]}
      </SemiDonutChart>
      <p className="m">{comment}</p>
    </S.Card>
  );
}

export default UserStatus;
