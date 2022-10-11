import React, { forwardRef } from "react";
import styled from "styled-components";

interface InputProps {
  name: string;
  type?: string;
  defaultValue?: string | number;
  errorMessage?: string;
  validator?: (a: string | null) => boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type = "text",
      defaultValue = "",
      errorMessage = "wrong Input",
      validator,
    },
    ref
  ) => {
    const value = null;
    // const isValid = validator();
    const isValid = true;
    return (
      <div>
        <InputBox
          name={name}
          ref={ref}
          type={type}
          defaultValue={defaultValue}
          placeholder={name}
        />
        {isValid && <p>{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

const InputBox = styled.input`
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 5px;
  &:focus {
    border: 1px solid gray;
  }
  & + p {
    color: red;
    // visibility: hidden;
    font-size: 0.8rem;
  }
`;
