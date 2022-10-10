import styled from "styled-components";

const Seperator = styled.div`
  display: flex;
  align-items: center;
  margin: 1em -1em;
  width: 100%;
  &:before,
  &:after {
    content: "";
    flex: 1;
    height: 1px;
    margin: 0 1em;
    background-color: black;
  }
`;

export default Seperator;
