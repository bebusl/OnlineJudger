import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "../components/common";
import LottiePlayer from "react-lottie-player";
import welcomeLottie from "../public/lottie/welcome-lottie.json";

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <LottiePlayer
          animationData={welcomeLottie}
          style={{ width: "900px", height: "900px" }}
          play
          loop={false}
          speed={3}
        />
      </Container>
    </>
  );
};

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
