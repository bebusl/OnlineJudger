import React from "react";
import Link from "next/link";
import styled from "styled-components";

const test = [
  { text: "HOME", href: "/" },
  { text: "PROBLEM", href: "/problem" },
  { text: "1", href: "." },
];

function BreadCrumbs({ props = test }: { props: { text: string; href: string }[] }) {
  return (
    <Nav aria-label="breadcrumb">
      <Ol>
        {props.map((prop) => (
          <li key={prop.text}>
            <Link href={prop.href}>{prop.text}</Link>
          </li>
        ))}
      </Ol>
    </Nav>
  );
}

export default BreadCrumbs;

const Nav = styled.nav`
  box-shadow: 5px 5px 10px #9e9e9e;
`;

const Ol = styled.ol`
  padding: 0.5rem;
  margin: 0;
  & > li {
    display: inline-block;
    &:not(:last-child):after {
      content: ">";
      margin: 1rem;
    }
  }
`;
