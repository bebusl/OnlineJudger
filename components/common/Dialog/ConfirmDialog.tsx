import React, { MouseEventHandler } from "react";
import Button from "../Buttons/BasicButton/Button";
import FlexBox from "../FlexBox";
import Modal from "../Modal";

function ConfirmDialog({
  message,
  onClose,
  onConfirm,
}: {
  message: string;
  onClose: Function;
  onConfirm: Function;
}) {
  return (
    <Modal onClose={onClose}>
      <FlexBox style={{ minWidth: "300px", minHeight: "150px" }}>
        <FlexBox style={{ flex: 2 }}>{message}</FlexBox>
        <div style={{ flex: 1 }}>
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
        </div>
      </FlexBox>
    </Modal>
  );
}

export default ConfirmDialog;
