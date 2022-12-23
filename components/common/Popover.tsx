import React, {
  FocusEventHandler,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

function Popover({
  top,
  left,
  children,
}: {
  top: number;
  left: number;
  children: React.ReactNode;
}) {
  const [isMount, setIsMount] = useState(false);

  const ref = (element: HTMLDivElement) => {
    if (element) {
      element.focus();
    }
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (isMount) {
    return createPortal(
      <div
        style={{
          position: "absolute",
          top: top,
          left: left,
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "3px 3px 10px rgba(99, 99, 99, 0.5)",
        }}
        tabIndex={-1}
        ref={ref}
      >
        {children}
      </div>,
      document.querySelector("body") as Element
    );
  }
  return null;
}

export default Popover;
