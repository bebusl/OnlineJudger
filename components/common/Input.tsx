import React, { useRef, forwardRef } from "react";

interface Props {
  name: string;
  type?: string;
  defaultValue?: string | number;
  // errorMessage?: string;
  // validator: Function;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      name,
      type = "text",
      defaultValue = "",
      // errorMessage = "wrong data",
      // validator,
    },
    ref
  ) => {
    // const isValid = validator();
    return (
      <div>
        <input
          name={name}
          ref={ref}
          type={type}
          defaultValue={defaultValue}
          placeholder={name}
        />
        {/* {!isValid && <p>{errorMessage}</p>} */}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
