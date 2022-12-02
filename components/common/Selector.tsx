import React, { ChangeEventHandler } from "react";
import styled from "styled-components";

interface selectorProps {
  options: { text: string; checked: boolean }[];
  onChange: ChangeEventHandler;
  groupName: string;
}
function Selector({
  options,
  onChange,
  groupName = "채점 가능 언어",
}: selectorProps) {
  console.log(groupName);
  return (
    <Wrapper $groupName={groupName}>
      {options.map((option) => {
        const { text, checked } = option;
        return (
          <CheckLabel key={text}>
            <input
              type={"checkbox"}
              name={text}
              id={text}
              defaultValue={text}
              checked={checked}
              style={{ display: "none" }}
              onChange={onChange}
            />
            <label htmlFor={text}>{text}</label>
          </CheckLabel>
        );
      })}
    </Wrapper>
  );
}

export default Selector;

const Wrapper = styled.div<{ $groupName: string }>`
  &:before {
    content: ${({ $groupName }) => `\"${$groupName}\"`};
    font-size: ${({ theme }) => theme.fontSizes[1]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    padding-right: 1.325rem;
    margin-right: 0.3rem;
    border-right: 1px solid ${({ theme }) => theme.colors.gray200};
  }
`;

const CheckLabel = styled.span`
  label {
    width: fit-content;
    padding: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    border-radius: 5px;
  }
  & input[type="checkbox"]:checked + label {
    color: red;
  }
`;
