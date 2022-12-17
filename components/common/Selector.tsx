import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Buttons/BasicButton/Button";
import Popover from "./Popover";

interface selectorProps {
  options: { text: string; checked: boolean; defaultValue?: string }[];
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
    <div>
      <Expander
        $variant="outline"
        onClick={(e) => {
          e.preventDefault();
          setExpand((prev) => !prev);

          const target = e.target as HTMLButtonElement;
          const rect = target.getBoundingClientRect();
          if (rect)
            setExpandPosition({
              top: rect.top + rect.height + window.scrollY,
              left: rect.left,
              width: rect.width > 320 ? rect.width : 320,
            });
        }}
      >
        {groupName}
      </Expander>
      {expand && (
        <Popover top={expandPosition.top} left={expandPosition.left}>
          <form tabIndex={-1} style={{ width: expandPosition.width }}>
            {options.map((option) => {
              const { text, checked, defaultValue } = option;
              return (
                <CheckLabel key={text}>
                  <input
                    type={"checkbox"}
                    name={text}
                    id={text}
                    defaultValue={defaultValue || text}
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
    </div>
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
