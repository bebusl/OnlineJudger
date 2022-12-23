import Link from "next/link";
import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <footer>
      <Link href="/admin?page=0" passHref>
        <FooterLink>관리자 페이지</FooterLink>
      </Link>
    </footer>
  );
}

export default Footer;

const FooterLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.colors.gray400};
`;
