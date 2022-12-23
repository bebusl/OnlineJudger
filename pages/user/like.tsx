import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Submission } from "../../api/scheme/submissions";
import { getLikedSubmissionList } from "../../api/submissionsAPI";
import { Button } from "../../components/common";
import SubmissionView from "../../components/templates/SubmissionView";
import WithSideBar from "../../components/templates/WithSideBar";

function Like() {
  const [likedSubmissons, setLikedSubmissions] = useState<
    {
      submission_id: string;
      submission: Submission;
    }[]
  >();
  const [page, setPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const res = await getLikedSubmissionList({ page });
        setLikedSubmissions(res.data.likes);
        console.log(res.data);
      } catch (e) {
        console.error("dl tMLQNK");
      }
    })();
  }, []);

  return (
    <WithSideBar>
      <h4>좋아요 목록</h4>
      {likedSubmissons &&
        likedSubmissons.map((liked) => {
          const submission = liked.submission;
          return (
            <article key={submission.created_at}>
              <h5>{submission.user_id}님의 풀이</h5>
              <SubmissionView
                submitInfo={[submission]}
                code={submission.code}
              />
              <Link href={`/problem/${submission.problem_id}`} passHref>
                <Button $variant="outline">문제 보러 가기</Button>
              </Link>
            </article>
          );
        })}
    </WithSideBar>
  );
}

export default Like;
