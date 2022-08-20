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
      {children}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export default DefaultLayout;
