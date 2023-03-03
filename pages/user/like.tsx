import React, { useEffect, useState } from "react";

import { Submission } from "../../api/scheme/submissions";
import { getLikedSubmissionList } from "../../api/submissionsAPI";

import { FlexBox } from "../../components/common";
import LinkS from "../../components/common/Link/LinkS";
import Pagination from "../../components/common/Pagination";
import SubmissionView from "../../components/unit/submissions/SubmissionView";
import WithSideBar from "../../components/layouts/WithSideBar";

function Like() {
  const [likedSubmissons, setLikedSubmissions] = useState<
    {
      submission_id: string;
      submission: Submission;
    }[]
  >([]);
  const [page, setPage] = useState({ current_pages: 1, total_pages: 0 });

  const fetchData = async () => {
    try {
      const res = await getLikedSubmissionList({ page: page.current_pages });
      setLikedSubmissions(res.data.likes);
      setPage(res.data.page);
    } catch (e) {
      setLikedSubmissions([]);
      setPage({ current_pages: 0, total_pages: 0 });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WithSideBar>
      <h4>좋아요 목록</h4>
      {!!likedSubmissons?.length ? (
        likedSubmissons.map((liked) => {
          const submission = liked.submission;
          return (
            <article key={submission.created_at}>
              <h5>{submission.user_id}님의 풀이</h5>
              <SubmissionView
                submitInfo={[submission]}
                code={submission.code}
              />
              <FlexBox flexDirection="row" justifyContent="end" gap="1rem">
                <LinkS
                  href={`/solution/${liked.submission_id}`}
                  text="좋아요 한 풀이 보러가기→"
                />
                <LinkS
                  href={`/problem/${submission.problem_id}`}
                  text="문제 보러 가기→"
                />
              </FlexBox>
            </article>
          );
        })
      ) : (
        <p>좋아요한 목록이 없습니다</p>
      )}
      <Pagination {...page} onChange={fetchData} />
    </WithSideBar>
  );
}

export default Like;

Like.defaultProps = {
  authRequired: true,
};
