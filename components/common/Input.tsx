import React, { forwardRef, InputHTMLAttributes, Ref } from "react";
import styled from "styled-components";
import Description from "./Typhography/Description";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  description?: string;
  errorMessage?: string;
  isValid?: boolean;
}

interface LabelInputProps extends InputProps {
  forwardedRef: Ref<HTMLInputElement>;
  text: string;
  name: string;
}

interface FormGroupProps extends InputProps {
  text: string;
  children: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", description, errorMessage = "잘못된 입력값입니다", isValid = true, ...rest },
    ref
  ) => {
    return (
      <InputWrapper>
        <input ref={ref} type={type} {...rest} />
        {description && <Description>{description}</Description>}
        <Description style={{ visibility: isValid ? "hidden" : "visible", color: "red" }}>
          {errorMessage}
        </Description>
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);

export const FormGroup = ({ children, ...props }: FormGroupProps) => {
  return (
    <FormGroupWrapper>
      <Label htmlFor={props.name}>{props.text}</Label>
      {children}
    </FormGroupWrapper>
  );
};

export const LabeledInput = React.memo(({ forwardedRef, ...props }: LabelInputProps) => {
  return (
    <FormGroup text={props.text}>
      <Input {...props} ref={forwardedRef} />
    </FormGroup>
  );
});

export const InputWrapper = styled.div`
  & > input {
    background-color: ${({ theme }) => theme.colors.gray50};
    padding: 10px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray150};
    border-radius: 5px;
  }

  & + p {
    color: ${({ theme }) => theme.colors.error};
    font-size: 0.8rem;
  }
`;

const FormGroupWrapper = styled.div`
  margin: 1rem 0;
  flex-grow: 1;
  & > label {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[2]};
  }
`;

const Label = styled.label``;
