import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { FlexBox } from "../common";
import { IconButton } from "../common/Buttons/IconButton/IconButton";

function WithSideBar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = router.pathname;

  return (
    <FlexBox
      flexDirection="row"
      alignItems="stretch"
      gap="10px"
      style={{ width: "100%", minHeight: "720px" }}
    >
      <div style={{ flex: 1 }}>
        <IconButton
          text="내 계정"
          subText="개인 계정 수정"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user");
          }}
          isActive={path === "/user"}
        />
        <IconButton
          text="비밀번호 재설정"
          subText="비밀번호를 변경합니다"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user/password-reset");
          }}
          isActive={path === "/user/password-reset"}
        />
        <IconButton
          text="제출 내역"
          subText="풀이를 제출한 문제"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user/problem");
          }}
          isActive={path === "/user/problem"}
        />
        <IconButton
          text="좋아요"
          subText="좋아요를 누른 코드을 모아서 보여줍니다"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user/like");
          }}
          isActive={path === "/user/like"}
        />
        <IconButton
          text="댓글"
          subText="댓글을 작성한 코드를 모아서 보여줍니다"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user/comments");
          }}
          isActive={path === "/user/comments"}
        />
      </div>
      <div style={{ flex: 3 }}>{children}</div>
    </FlexBox>
  );
}

export default WithSideBar;
