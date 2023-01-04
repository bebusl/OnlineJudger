import Link from "next/link";
import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <Link href="/admin?page=0" passHref>
        <FooterLink>관리자 페이지</FooterLink>
      </Link>
    </Container>
  );
}

export default Footer;

const Container = styled.footer`
  text-align: center;
`;

const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.colors.gray400};
`;
