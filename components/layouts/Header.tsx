import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container, Logo } from "./Header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";
import Popover from "../common/Popover";
import { FlexBox } from "../common";
import Image from "next/image";

function Header() {
  const { isLogin, avatar, name } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isMount, setIsMount] = useState(false);
  const [openUserPopover, setOpenUserPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<number>(0);
  useEffect(() => {
    setIsMount(true);
    const handleResizeEvent = (e) => {
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
                  <div ref={popoverRef}>
                    <Image
                      width="50px"
                      height="50px"
                      src={avatar}
                      alt="user profile image"
                    />
                    <p>@test1234</p>
                  </div>
                  <Link href="/user">마이 페이지</Link>
                  <Link href="/user/problem">푼 문제</Link>
                  <button
                    onClick={() => {
                      dispatch(logoff());
                    }}
                  >
                    로그아웃
                  </button>
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
