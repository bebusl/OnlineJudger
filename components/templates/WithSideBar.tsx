import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { FlexBox } from "../common";
import { IconButton } from "../common/Button";

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
          text="해결한 문제"
          subText="해결한 문제"
          onClick={(e) => {
            e.preventDefault();
            router.push("/user/problem");
          }}
          isActive={path === "/user/problem"}
        />
      </div>
      <div style={{ flex: 3 }}>{children}</div>
    </FlexBox>
  );
}

export default WithSideBar;
