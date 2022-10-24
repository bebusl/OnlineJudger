import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";

const Home: NextPage = () => (
  <Container>
    <h1>온라인 져저를 통해</h1>
    <h1>문제를 풀어보세요</h1>
    <Link href="problem">문제풀러가기 Go</Link>
  </Container>
);

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;
export default Home;
