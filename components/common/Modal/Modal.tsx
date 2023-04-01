import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Button from "../Buttons/BasicButton/Button";
import FlexBox from "../FlexBox";
import * as S from "./Modal.style";

interface ModalProps {
  onClose: Function;
  title?: string;
  children?: ReactNode;
}

function Modal({ children, onClose, title = "" }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = (element: HTMLDivElement) => {
    if (element) element.focus();
  }; //callback ref

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const Element = () => (
    <S.Container ref={ref} tabIndex={-1}>
      <S.Background onClick={() => onClose()} />
      <S.Paper>
        <FlexBox as="header" flexDirection="row" justifyContent="space-between">
          <h3>{title}</h3>
          <Button onClick={() => onClose()} width="50px">
            X
          </Button>
        </FlexBox>
        {children}
      </S.Paper>
    </S.Container>
  );

  if (isMounted) {
    const element = document.getElementById("portal") as Element;
    return ReactDOM.createPortal(<Element />, element);
  }
  return null;
}

export default Modal;
