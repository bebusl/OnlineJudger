import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
interface Props {
  children?: React.ReactNode;
}

function DefaultLayout({ children }: Props) {
  return (
    <Container>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Body = styled.div`
  flex-basis: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DefaultLayout;
