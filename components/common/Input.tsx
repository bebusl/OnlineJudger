import React, {
  Children,
  forwardRef,
  InputHTMLAttributes,
  Ref,
  useEffect,
} from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  errorMessage?: string;
  isValid?: boolean;
}

interface LabelInputProps extends InputProps {
  forwardref: Ref<HTMLInputElement>;
  text: string;
  name: string;
}

interface FormGroupProps extends InputProps {
  text: string;
  children: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type = "text", errorMessage = "wrong Input", isValid = true, ...rest },
    ref
  ) => {
    return (
      <InputWrapper>
        <input ref={ref} type={type} {...rest} />
        <p style={{ visibility: isValid ? "hidden" : "visible" }}>
          {errorMessage}
        </p>
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

export const LabeledInput = ({ forwardref, ...props }: LabelInputProps) => {
  console.log(forwardref);
  return (
    <FormGroup text={props.text}>
      <Input {...props} ref={forwardref} />
    </FormGroup>
  );
};

export const InputWrapper = styled.div`
  & > input {
    background-color: ${({ theme }) => theme.colors.gray50};
    padding: 10px;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.colors.gray100};
    border-radius: 5px;
  }

  & + p {
    color: ${({ theme }) => theme.colors.warning};
    font-size: 0.8rem;
  }
`;

const FormGroupWrapper = styled.div`
  margin: 1rem 0;
  & > label {
    font-weight: bold;
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
`;

const Label = styled.label``;
