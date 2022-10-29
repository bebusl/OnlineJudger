import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import FlexBox from "./FlexBox";

interface ModalProps {
  onClose: Function;
  children?: ReactNode;
}

function Modal({ children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(false);
    return () => setIsMounted(false);
  }, []);
  const ModalTest: ReactNode = (
    <FlexBox
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000",
          opacity: "0.3",
        }}
        onClick={(e) => console.log("OUTER CLICK")}
      ></div>
      <article
        style={{
          backgroundColor: "#fff",
          opacity: 1,
          minWidth: "700px",
          minHeight: "500px",
          zIndex: 1000,
          color: "#000",
        }}
        onClick={(e) => console.log("INNEr CLICK")}
      >
        <header>
          이름입니당~<Button>X</Button>
        </header>
        {children}
      </article>
    </FlexBox>
  );
  if (isMounted) {
    const element = document?.querySelector("#portal") as Element;
    return ReactDOM.createPortal(ModalTest, element);
  }
  return null;
}

export default Modal;
