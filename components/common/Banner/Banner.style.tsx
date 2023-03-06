import styled from "styled-components";

export const Card = styled.article<{ background: string }>`
  position: relative;
  background: ${(props) => props.background || "white"};
  height: 350px;
  width: 100%;
  max-width: 1200px;
  text-align: left;
  color: white;
`;

export const LeftBox = styled.div`
  position: absolute;
  top: 0;
  left: 10;
  z-index: 1;
  width: 400px;
  padding: 3rem;
  word-break: break-word;
`;

export const Tag = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[1]};
  border-radius: 3rem;
  background-color: #00000090;
  width: fit-content;
  padding: 5px;
`;

export const RightBox = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  top: 0;
  right: 0;
`;
