import React, { forwardRef, InputHTMLAttributes, Ref, useEffect } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  errorMessage?: string;
  isValid?: boolean;
}

interface LabelInputProps extends InputProps {
  grandchildRef: Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", errorMessage = "wrong Input", isValid = true, ...rest },
    ref
  ) => {
    return (
      <div>
        <InputBox ref={ref} type={type} {...rest} />
        <p style={{ visibility: isValid ? "hidden" : "visible" }}>
          {errorMessage}
        </p>
      </div>
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);

export const LabelInput = ({ grandchildRef, ...props }: LabelInputProps) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.name}</label>
      <Input {...props} ref={grandchildRef} />
    </div>
  );
};

export const InputBox = styled.input`
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
    font-size: 0.8rem;
  }
`;
