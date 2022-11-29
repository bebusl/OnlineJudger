import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Logo } from "./Header.style";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";

const dummyImg =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=50";

function Header() {
  const isLogin = useAppSelector((state) => state.auth?.isLogin);
  const dispatch = useAppDispatch();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <Container>
      <Logo>
        <Link href="/">Online Judge</Link>
      </Logo>
      <div style={{ width: "30%" }}>
        {isMount && isLogin ? (
          <>
            <Link href="/scoreboard">채점현황</Link>
            <Link href="/problem?page=1">문제보기</Link>
            <Link href="/user/problem">푼 문제</Link>
            <Link href="/user" passHref>
              <span>
                <Image
                  alt="profile image"
                  src={dummyImg}
                  width="50px"
                  height="50px"
                />
              </span>
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
            <Link href="/login">로그인</Link>
            <Link href="/register">회원가입</Link>
          </>
        )}
      </div>
    </Container>
  );
}

export default React.memo(Header);
