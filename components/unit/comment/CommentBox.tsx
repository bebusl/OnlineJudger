import React, { useEffect, useState } from "react";
import { Comment as CommentType } from "../../../api/scheme/submissions";
import Comment from "./Comment";
import CommentEditor from "./CommentEditor";

function CommentBox({
  comments,
  fetchData,
}: {
  comments: CommentType[];
  fetchData: Function;
}) {
  const [needFetch, setFetch] = useState(false);

  useEffect(() => {
    fetchData();
  }, [needFetch]);

  const updateData = () => {
    setFetch((prev) => !prev);
  };

  return (
    <section>
      <CommentEditor updateData={updateData} />
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.created_at}
          updateData={updateData}
        />
      ))}
    </section>
  );
}

export default CommentBox;
