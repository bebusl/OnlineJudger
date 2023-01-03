import styled from "styled-components";

const ScrollBox = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width ?? "100%"};
  position: relative;
  box-sizing: border-box;
  top: 0;
  left: 0;
  padding: 1rem;
  height: ${({ height }) => height ?? "100%"};
  overflow: scroll;
`;
export default ScrollBox;

/**TODO
 * scrollbar 스타일 수정
 */
