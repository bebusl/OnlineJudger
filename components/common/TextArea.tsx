import React, {
  forwardRef,
  Ref,
  RefObject,
  TextareaHTMLAttributes,
} from "react";
import styled from "styled-components";
import { InputBox } from "./Input";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  isValid?: boolean;
}

const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(
  ({ errorMessage = "잘못된 입력값입니다.", isValid = true, ...rest }, ref) => {
    return (
      <div>
        <TextareaBox
          ref={ref as unknown as RefObject<HTMLTextAreaElement>}
          {...rest}
          as="textarea"
        />
        <p style={{ visibility: isValid ? "hidden" : "visible" }}>
          {errorMessage}
        </p>
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default React.memo(TextArea);

const TextareaBox = styled(InputBox)`
  height: 200px;
  resize: none;
`;
