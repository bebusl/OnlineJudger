import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import * as S from "./Selector.style";
import Button from "../Buttons/BasicButton/Button";

interface selectorProps {
  options: {
    text: string | number;
    checked: boolean;
    defaultValue?: string | number;
  }[];
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
    function handleClickOutside({ target }: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(target as Node))
        setExpand(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <S.Expand ref={boxRef}>
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
        <S.Options>
          {options.map((option) => {
            const { text, checked, defaultValue } = option;
            const strText = String(text);
            return (
              <S.CheckLabel key={text}>
                <input
                  type={"checkbox"}
                  name={strText}
                  id={strText}
                  defaultValue={defaultValue || text}
                  checked={checked}
                  onChange={onChange}
                />
                <label htmlFor={strText}>{text}</label>
              </S.CheckLabel>
            );
          })}
        </S.Options>
      )}
    </S.Expand>
  );
}

export default Selector;
