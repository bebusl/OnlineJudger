import React, { useRef, useState } from "react";
import styled from "styled-components";

import { editComment, removeComment } from "../../../api/submissionsAPI";

import { relativeTimeFormatter } from "../../../utils/dateUtils";

import { Comment as CommentType } from "../../../api/scheme/submissions";
import { useAppSelector } from "../../../hooks/useStore";
import { FlexBox } from "../../common";

function Comment({
  comment,
  updateData,
}: {
  comment: CommentType;
  updateData?: Function;
}) {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState("");
  const { email } = useAppSelector((state) => state.auth);

  const handleRemoveBtnClick = async () => {
    try {
      const res = await removeComment({ comment_id: comment.comment_id });
      if (res.data.success && updateData) updateData();
    } catch (error) {}
  };

  const handleEditBtnClick = async () => {
    try {
      const res = await editComment({
        comment_id: comment.comment_id,
        content: editValue,
      });
      if (res.data.success && updateData) updateData();
    } catch (e) {}
  };

  const formattedTime = relativeTimeFormatter(new Date(comment.created_at));

  return (
    <Content>
      <Header>
        <div>
          <strong style={{ display: "inline-block" }}>{comment.user_id}</strong>
          <p style={{ display: "inline-block", margin: "0.5rem" }}>
            {formattedTime}
          </p>
        </div>
        {editMode && (
          <span>
            <Button
              onClick={() => {
                setEditMode(false);
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                handleEditBtnClick();
                setEditMode(false);
              }}
            >
              수정
            </Button>
          </span>
        )}
        {!editMode && comment.user_id === email && (
          <span>
            <Button
              onClick={() => {
                handleRemoveBtnClick();
              }}
            >
              삭제
            </Button>
            <Button
              onClick={() => {
                setEditMode(true);
              }}
            >
              수정
            </Button>
          </span>
        )}
      </Header>
      {editMode ? (
        <textarea
          style={{ border: "none", height: "auto", backgroundColor: "inherit" }}
          defaultValue={comment.content}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
        />
      ) : (
        <p style={{ padding: "1rem", margin: 0, whiteSpace: "pre-line" }}>
          {comment.content}
        </p>
      )}
    </Content>
  );
}

export default Comment;

const Content = styled.article`
  * {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  background-color: ${({ theme }) => theme.colors.gray50};
  display: flex;
  align-items: stretch;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray150};
  & > div {
    flex-grow: 3;
    padding: 0.5rem;
  }
  & > button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
  }
`;

const Header = styled(FlexBox).attrs({
  justifyContent: "space-between",
  flexDirection: "row",
})``;

const Button = styled.button`
  background-color: inherit;
  border: none;
  color: ${({ theme }) => theme.colors.gray400};
`;
