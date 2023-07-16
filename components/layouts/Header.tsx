import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";

import Image from "next/image";
import { Container, Logo } from "./Header.style";
import { FlexBox } from "../common";
import Popover from "../common/Popover";

function Header() {
  /** get user data from redux store */
  const { isLogin, avatar, name, email } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();

  const [openUserPopover, setOpenUserPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Logo>
        <Link href="/">Online Judge</Link>
      </Logo>
      <FlexBox flexDirection="row" gap="0.8rem" role="menubar">
        {isLogin ? (
          <>
            <div style={{ flex: "0 0 auto" }}>
              <Link href="/problem?page=1">문제보기</Link>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <Link href="/user/problem" style={{ flex: "0 0 auto" }}>
                푼 문제
              </Link>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <Link href="/scoreboard">채점현황</Link>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <div
                onClick={(e) => {
                  setOpenUserPopover((prev) => !prev);
                }}
                id="popoverbox"
                style={{ cursor: "pointer", position: "relative" }}
              >
                <p style={{ margin: "0" }}>{name}님</p>
                {openUserPopover && (
                  <div
                    style={{ position: "absolute", zIndex: 3, left: "-100px" }}
                  >
                    <FlexBox
                      flexDirection="column"
                      style={{
                        width: "200px",
                        height: "200px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        border: "1px solid #ededed",
                      }}
                      onMouseLeave={() => setOpenUserPopover(false)}
                    >
                      <div ref={popoverRef} style={{ textAlign: "center" }}>
                        <Image
                          width="50px"
                          height="50px"
                          src={avatar}
                          alt="user profile image"
                        />
                        <p>{email}</p>
                      </div>
                      <Link href="/user">마이 페이지</Link>
                      <Link href="/user/problem">푼 문제</Link>
                      <a
                        onClick={() => {
                          dispatch(logoff());
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        로그아웃
                      </a>
                    </FlexBox>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <Link href="/problem?page=1">문제보기</Link>
            <Link href="/login">로그인</Link>
            <Link href="/register">회원가입</Link>
          </>
        )}
      </FlexBox>
    </Container>
  );
}

export default React.memo(Header);

const MenuItem = (
  <div>
    <Link></Link>
  </div>
);
