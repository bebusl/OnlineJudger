import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";

import Image from "next/image";
import { Container, Logo } from "./Header.style";
import { FlexBox } from "../common";
import Popover from "../common/Popover";

function Header() {
  const { isLogin, avatar, name, email } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const [isMount, setIsMount] = useState(false);
  const [openUserPopover, setOpenUserPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<number>(0);
  useEffect(() => {
    setIsMount(true);
    const handleResizeEvent = (e: UIEvent) => {
      countRef.current = countRef.current + 1;
      const popoverBoxElement = document.getElementById("popoverbox");
      const rect = popoverBoxElement?.getBoundingClientRect();
      if (rect) setPopoverPosition({ top: rect.top, left: rect.left });
    };
    window.addEventListener("resize", handleResizeEvent);
    return () => window.removeEventListener("resize", handleResizeEvent);
  }, []);

  return (
    <Container>
      <Logo>
        <Link href="/">Online Judge</Link>
      </Logo>
      <FlexBox flexDirection="row" gap="1.325rem" style={{ maxWidth: "50%" }}>
        {isMount && isLogin ? (
          <>
            <Link href="/scoreboard">채점현황</Link>
            <Link href="/problem?page=1">문제보기</Link>
            <Link href="/user/problem">푼 문제</Link>
            <div
              onClick={(e) => {
                const target = e.target as HTMLDivElement;
                const rect = target.getBoundingClientRect();
                setOpenUserPopover(true);
                setPopoverPosition({
                  top: rect.top + rect.height,
                  left: rect.left - 50,
                });
              }}
              id="popoverbox"
              style={{ cursor: "pointer" }}
            >
              {name}님
            </div>
            {openUserPopover && (
              <Popover top={popoverPosition.top} left={popoverPosition.left}>
                <FlexBox
                  flexDirection="column"
                  style={{ width: "200px", height: "200px" }}
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
              </Popover>
            )}
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/register">회원가입</Link>
          </>
        )}
      </FlexBox>
    </Container>
  );
}

export default React.memo(Header);
