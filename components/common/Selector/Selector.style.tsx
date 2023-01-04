import styled from "styled-components";

export const Expand = styled.div`
  & > button:after {
    content: "";
    margin-top: 0.3em;
    vertical-align: middle;
    border-top: 0.3em solid;
    border-bottom: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-left: 0.3em solid transparent;
    float: right;
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.gray150};
  }
`;

export const CheckLabel = styled.div`
  label {
    width: fit-content;
  }
`;

export const Options = styled.div`
  position: absolute;
  background-color: white;
  min-width: 150px;
  z-index: 500;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
  box-shadow: ${({ theme }) => theme.shadows.light};
`;
