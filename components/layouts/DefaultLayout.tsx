import React, { ReactElement, ReactFragment, ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

function DefaultLayout({ page }: { page: ReactElement }) {
  return (
    <Container>
      <Header />
      <Body>{page}</Body>
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

const Body = styled.main`
  flex-basis: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export default DefaultLayout;
