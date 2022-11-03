import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Logo, SearchBarWrapper } from "./Header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";

function Header() {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Logo>
        <Link href="/">Online Judge</Link>
      </Logo>

      <SearchBarWrapper>
        <input type="text" placeholder="Search" />
        <button type="submit">
          <Image
            src="/images/icon_search/_search@3x.webp"
            alt="Search Icon"
            width="100%"
            height="100%"
          />
        </button>
      </SearchBarWrapper>
      <div>
        {isLogin ? (
          <>
            <Link href="scoreboard">채점현황</Link>
            <Link href="problem">문제보기</Link>
            <Link href="user/problem">푼 문제</Link>
            <Link href="user">
              <div>
                <Image
                  alt="person"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=50"
                  width="50px"
                  height="50px"
                />
              </div>
            </Link>
            <button
              onClick={() => {
                dispatch(logoff());
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="login">로그인</Link>
            <Link href="register">회원가입</Link>
          </>
        )}
      </div>
    </Container>
  );
}

export default React.memo(Header);
