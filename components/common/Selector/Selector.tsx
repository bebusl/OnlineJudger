import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Buttons/BasicButton/Button";
import Popover from "../Popover";

interface selectorProps {
  options: { text: string; checked: boolean; defaultValue?: string | number }[];
  onChange: ChangeEventHandler;
  groupName: string;
}
function Selector({
  options,
  onChange,
  groupName = "채점 가능 언어",
}: selectorProps) {
  const [expand, setExpand] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setExpand(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Expand ref={boxRef}>
      <Button
        $variant="outline"
        onClick={(e) => {
          e.preventDefault();
          setExpand((prev) => !prev);
        }}
      >
        {groupName}
      </Button>
      {expand && (
        <Options>
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
        </Options>
      )}
    </Expand>
  );
}

export default Selector;

const Expand = styled.div`
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

const CheckLabel = styled.div`
  label {
    width: fit-content;
  }
`;

const Options = styled.div`
  position: absolute;
  background-color: white;
  min-width: 150px;
  z-index: 500;
  border: 1px solid ${({ theme }) => theme.colors.gray150};
  box-shadow: ${({ theme }) => theme.shadows.light};
`;
