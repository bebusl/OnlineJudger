import React, { useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { writeComment } from "../../../api/submissionsAPI";

import { useAppSelector } from "../../../hooks/useStore";
import { FlexBox } from "../../common";
import TextArea from "../../common/TextArea";

function Comment({ updateData }: { updateData: Function }) {
  const { name, email } = useAppSelector((state) => state.auth);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { submitId } = router.query;

  return (
    <Content>
      <div>
        <Header>
          <strong>
            {name} | {email}
          </strong>
        </Header>
        <TextText ref={commentRef} />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          const comment = commentRef.current?.value;
          if (comment && submitId) {
            const res = writeComment({
              content: comment,
              submission_id: submitId as string,
            })
              .then((res) => {
                if (res.data.success) {
                  updateData();
                  commentRef.current.value = "";
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }}
      >
        등록
      </button>
    </Content>
  );
}

export default Comment;

const Content = styled.article`
  * {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: stretch;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
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

const TextText = styled(TextArea)`
  border: none;
  height: 5rem;
  background-color: inherit;
`;
