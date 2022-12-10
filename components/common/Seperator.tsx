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
    margin: 0; //여기서 값이 있는지 없는지 가지고 띄울지 말지 정하면 됨~
    background-color: black;
  }
`;

export default Seperator;
