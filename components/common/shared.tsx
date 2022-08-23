import styled from "styled-components";

export const FlexBox = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  gap?: number | string;
  flexDirection?: "row" | "column";
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent ?? "center"};
  align-items: ${({ alignItems }) => alignItems ?? "center"};
  flex-direction: ${({ flexDirection }) => flexDirection ?? "column"};
  gap: ${({ gap }) => gap ?? 0};
`;
