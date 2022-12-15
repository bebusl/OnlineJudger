import styled from "styled-components";
import Link from "next/link";
import React from "react";

function LinkS({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} passHref>
      <Anchor>{text}</Anchor>
    </Link>
  );
}

const Anchor = styled.a`
  font-size: ${({ theme }) => theme.fontSizes[0]};
  margin-top: 1rem;
`;

export default LinkS;
