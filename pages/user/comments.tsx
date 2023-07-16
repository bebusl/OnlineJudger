import React, { useEffect, useState } from "react";
import withAuth from "../../components/guard/withAuth";
import { getMyComments } from "../../api/submissionsAPI";
import { Comment as CommentType } from "../../api/scheme/submissions";
import Comment from "../../components/unit/comment/Comment";
import WithSideBar from "../../components/layouts/WithSideBar";

import LinkS from "../../components/common/Link/LinkS";
import Pagination from "../../components/common/Pagination";

function Comments() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState({ current_pages: 1, total_pages: 0 });

  const fetchData = async () => {
    try {
      const result = await getMyComments({ page: 1 });
      setComments(result.data.comments);
      setPage(result.data.page);
    } catch {
      setComments([]);
      setPage({ current_pages: 1, total_pages: 0 });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WithSideBar>
      <h4>작성한 댓글</h4>
      {!comments.length && <div>작성한 댓글이 없습니다</div>}
      {comments?.map((comment) => (
        <div key={comment.created_at} style={{ padding: "1rem" }}>
          <Comment comment={comment} />
          <LinkS
            href={`/solution/${comment.submission_id}`}
            text="본문 보기→"
          />
        </div>
      ))}
      <Pagination {...page} onChange={fetchData} />
    </WithSideBar>
  );
}

export default withAuth(Comments);
