import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import React, { ChangeEventHandler, useEffect, useState } from "react";

import {
  deleteLikeSubmission,
  getSubmissionsByQuery,
  likeSubmission,
} from "../../api/submissionsAPI";
import { Submission } from "../../api/scheme/submissions";

import { Button, FlexBox } from "../../components/common";
import { StatusTagMapper } from "../../components/common/Tag";
import SubmissionView from "../../components/templates/SubmissionView";
import { LogoIconMapper } from "../../components/LanguageAsset";
import CommentBox from "../../components/unit/comment/CommentBox";
import { dateFormatter } from "../../utils/dateUtils";

function UserSubmissions() {
  const router = useRouter();
  const { submitId } = router.query as { submitId: string };
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState<Submission | null>(null);
  const [liked, setLiked] = useState(false);

  const fetchData = async () => {
    const res = await getSubmissionsByQuery({ id: submitId });
    if (res.data.success) {
      setInfo(res.data.submissions[0]);
      setLiked(res.data.submissions[0].liked);
    }
    setIsLoading(false);
  };

  const handleChangeLike: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    if (!info) return;
    if (checked) {
      likeSubmission({ submission_id: info.id });
      setInfo((prev) => (prev ? { ...prev, like: prev.like + 1 } : null));
    } else {
      deleteLikeSubmission({ submission_id: info.id });
      setInfo((prev) => (prev ? { ...prev, like: prev.like - 1 } : null));
    }
    setLiked(checked);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>로딩 중</div>;

  if (!info) return <div>잘못된 접근입니다</div>;
  console.log("왜 안뒘", info.created_at, new Date(info.created_at));
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />

      <section>
        <div>
          {LogoIconMapper[info?.language]}
          {StatusTagMapper[info?.status || "PENDING"]}
        </div>
        <h1 style={{ fontSize: "1.5rem" }}>
          {info?.user_id}님의 {info?.problem_id}번 풀이
        </h1>
        <FlexBox flexDirection="row" justifyContent="space-between">
          <Link href={`/problem/${info?.problem_id}`}>
            <Button $variant="outline">문제보러가기</Button>
          </Link>
          <label htmlFor="emptyHeart">
            {liked ? (
              <svg
                width={"24px"}
                height="24px"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              <svg
                width="24px"
                height="24px"
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m7.234 3.004c-2.652 0-5.234 1.829-5.234 5.177 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-3.353-2.58-5.168-5.229-5.168-1.836 0-3.646.866-4.771 2.554-1.13-1.696-2.935-2.563-4.766-2.563zm0 1.5c1.99.001 3.202 1.353 4.155 2.7.14.198.368.316.611.317.243 0 .471-.117.612-.314.955-1.339 2.19-2.694 4.159-2.694 1.796 0 3.729 1.148 3.729 3.668 0 2.671-2.881 5.673-8.5 11.127-5.454-5.285-8.5-8.389-8.5-11.127 0-1.125.389-2.069 1.124-2.727.673-.604 1.625-.95 2.61-.95z"
                  fillRule="nonzero"
                />
              </svg>
            )}
            {info?.like}
          </label>

          <input
            type="checkbox"
            id="emptyHeart"
            checked={liked}
            onChange={handleChangeLike}
            style={{ display: "none" }}
          />
        </FlexBox>

        <SubmissionView
          code={info.code}
          submitInfo={[
            Object.assign(info, {
              created_at: dateFormatter(info.created_at),
            }),
          ]}
        />
        <CommentBox comments={info.comments} fetchData={fetchData} />
      </section>
    </>
  );
}

export default UserSubmissions;
