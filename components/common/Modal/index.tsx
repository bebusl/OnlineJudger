import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../Buttons/BasicButton/Button";
import FlexBox from "../FlexBox";

interface ModalProps {
  onClose: Function;
  title?: string;
  children?: ReactNode;
}

function Modal({ children, onClose, title = "" }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = (element: HTMLDivElement) => {
    if (element) element.focus();
  };
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const Element = () => (
    <FlexBox
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
      ref={ref}
      tabIndex={-1}
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
        onClick={() => onClose()}
      />
      <article
        style={{
          backgroundColor: "#fff",
          opacity: 1,
          zIndex: 1000,
          color: "#000",
          borderRadius: "5px",
          boxShadow: "3px 3px 10px rgba(99, 99, 99, 0.5)",
        }}
      >
        <FlexBox
          as="header"
          flexDirection="row"
          justifyContent="space-between"
          style={{ padding: "10px" }}
        >
          <h3>{title}</h3>
          <Button onClick={() => onClose()} width="50px">
            X
          </Button>
        </FlexBox>
        {children}
      </article>
    </FlexBox>
  );

  if (isMounted) {
    const element = document.getElementById("portal") as Element;
    return ReactDOM.createPortal(<Element />, element);
  }
  return null;
}

export default Modal;