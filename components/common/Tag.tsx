import styled from "styled-components";

const Tag = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.gray150};
  border-radius: 5px;
`;

export default Tag;
