import styled from "styled-components";

const ScrollBox = styled.div<{ width?: string; height?: string }>`
  width: ${({ width }) => width ?? "100%"};
  position: relative;
  top: 0;
  left: 0;
  height: ${({ height }) => height ?? "100%"};
  overflow: scroll;
`;
export default ScrollBox;

/**TODO
 * scrollbar 스타일 수정
 */
