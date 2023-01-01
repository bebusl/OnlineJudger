import styled from "styled-components";
import FlexBox from "../FlexBox";

export const Container = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
`;

export const Paper = styled.article`
  background-color: white;
  z-index: 1000;
  min-width: 60vw;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadows.dark};
  ${FlexBox} {
    padding: 1rem;
  }
`;
