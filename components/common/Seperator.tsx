import styled from "styled-components";

const Seperator = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.gray400};
  font-size: ${({ theme }) => theme.fontSizes[0]};
  margin: 1rem 0;
  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray400};
  }
  &:before {
    margin-right: 0.5rem;
  }
  &:after {
    margin-left: 0.5rem;
  }
`;

export default Seperator;
