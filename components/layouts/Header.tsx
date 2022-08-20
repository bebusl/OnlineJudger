import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Container, Logo, SearchBarWrapper } from "./Header.style";

function Header() {
  return (
    <Container>
      <Logo>Online Judge</Logo>
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
        <Link href="#">채점현황</Link>
        <Link href="#">문제보기</Link>
        <Link href="#">푼 문제</Link>
        <Link href="mypage">
          <div>
            <Image
              alt="person"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=50"
              width="50px"
              height="50px"
            />
          </div>
        </Link>
      </div>
    </Container>
  );
}

export default Header;
