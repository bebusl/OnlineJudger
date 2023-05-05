import { useRouter } from "next/router";
import React, { MouseEventHandler, ReactNode } from "react";
import { FlexBox } from "../common";
import { IconButton } from "../common/Buttons/IconButton/IconButton";
import styled from "styled-components";

interface SidebarProps {
  children: ReactNode;
  menus?: { title: string; subTitle: string; path: string }[];
}

const mypagePaths = [
  { title: "내 계정", subTitle: "개인 계정 수정", path: "/user" },
  {
    title: "비밀번호 재설정",
    subTitle: "비밀번호를 변경합니다.",
    path: "/user/password-reset",
  },
  { title: "제출 내역", subTitle: "풀이를 제출한 문제", path: "/user/problem" },
  {
    title: "좋아요",
    subTitle: "좋아요를 누른 코드를 모아 볼 수 있습니다",
    path: "/user/like",
  },
  {
    title: "댓글",
    subTitle: "댓글을 작성한 코드를 모아 볼 수 있습니다",
    path: "/user/comments",
  },
];

function WithSideBar({ children, menus = mypagePaths }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;

  const handleClick: (path: string) => MouseEventHandler = (path) => (e) => {
    e.preventDefault();
    // router.push("/");
    router.push(path);
  };

  return (
    <Layout>
      <div role="menu" style={{ flex: "1 0 250px" }}>
        {menus.map((menu) => (
          <IconButton
            text={menu.title}
            subText={menu.subTitle}
            onClick={handleClick(menu.path)}
            isActive={pathname === menu.path}
            key={menu.title}
          />
        ))}
      </div>
      <div style={{ flex: "1 0 80%" }}>{children}</div>
    </Layout>
  );
}

export default WithSideBar;

const Layout = styled(FlexBox)`
  flex-direction: row;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  min-height: 720px;
  ${({ theme }) => theme.mediaQueries.tablet} {
    flex-wrap: wrap;
  }
`;
