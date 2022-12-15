import React, { MouseEventHandler } from "react";
import Button from "../Buttons/BasicButton/Button";
import MediumCard from "../Card/MediumCard";
import FlexBox from "../FlexBox";
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
    <Modal onClose={onClose}>
      <MediumCard $variant="normal">
        <FlexBox
          style={{
            height: "130px",
            verticalAlign: "middle",
          }}
        >
          {message}
        </FlexBox>
        <Button
          onClick={onClose as MouseEventHandler}
          style={{ marginRight: "1rem" }}
          $variant="outline"
        >
          취소
        </Button>
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
