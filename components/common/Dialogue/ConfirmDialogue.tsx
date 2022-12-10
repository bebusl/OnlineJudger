import React, { MouseEventHandler } from "react";
import Button from "../Buttons/BasicButton/Button";
import MediumCard from "../Card/MediumCard";
import Modal from "../Modal";

function ConfirmDialogue({
  message = "testTesttesttTTEXTTXTSETSE",
  onClose,
  onConfirm,
}: {
  message: string;
  onClose: Function;
  onConfirm: Function;
}) {
  return (
    <Modal onClose={() => console.log("CLOSE")}>
      <MediumCard $variant="normal">
        <p>{message}</p>
        <Button onClick={onClose as MouseEventHandler}>취소</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onConfirm();
          }}
        >
          확인
        </Button>
      </MediumCard>
    </Modal>
  );
}

export default ConfirmDialogue;
