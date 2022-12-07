import React, {
  forwardRef,
  Ref,
  RefObject,
  TextareaHTMLAttributes,
} from "react";
import styled from "styled-components";
import { FormGroup } from "./Input";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  isValid?: boolean;
}

interface LabeledTextAreaProps extends TextAreaProps {
  forwardRef?: Ref<HTMLTextAreaElement>;
  name: string;
  text: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ errorMessage = "잘못된 입력값입니다.", isValid = true, ...rest }, ref) => {
    return (
      <div style={{ flexGrow: 1 }}>
        <TextareaBox ref={ref} {...rest} as="textarea" />
        {!isValid && (
          <p
            style={{
              display: !isValid ? "block" : "none",
              fontSize: "0.8rem",
            }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

export const LabeledTextArea = ({
  forwardRef,
  text,
  ...props
}: LabeledTextAreaProps) => {
  return (
    <FormGroup text={text}>
      <TextArea {...props} ref={forwardRef} />
    </FormGroup>
  );
};

TextArea.displayName = "TextArea";

export default React.memo(TextArea);

const TextareaBox = styled.textarea`
  background-color: ${({ theme }) => theme.colors.gray50};
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 5px;
  height: 200px;
  resize: none;
`;
