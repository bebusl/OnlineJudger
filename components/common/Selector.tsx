import React, { ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import ErrorBoundary from "./ErrorBoundary";
import Popover from "./Popover";

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
  const [expand, setExpand] = useState(false);
  const [expandPosition, setExpandPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  return (
    <>
      <Expander
        $variant="outline"
        onClick={(e) => {
          e.preventDefault();
          setExpand((prev) => !prev);
          const target = e.target as HTMLButtonElement;
          const rect = target.getBoundingClientRect();
          if (rect)
            setExpandPosition({
              top: rect.top + rect.height,
              left: rect.left,
              width: rect.width,
            });
        }}
      >
        {groupName}
      </Expander>
      {expand && (
        <Popover top={expandPosition.top} left={expandPosition.left}>
          <form style={{ width: expandPosition.width }}>
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
                    onChange={onChange}
                  />
                  <label htmlFor={text}>{text}</label>
                </CheckLabel>
              );
            })}
          </form>
        </Popover>
      )}
    </>
  );
}

export default Selector;

const Expander = styled(Button)`
  &:after {
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

const CheckLabel = styled.div`
  label {
    width: fit-content;
  }
`;
