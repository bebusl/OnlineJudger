import React, { MouseEventHandler } from "react";
import Button from "../Buttons/BasicButton/Button";
import Modal from "../Modal";
import * as S from "./ConfirmDialog.style";

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
      <S.Wrapper>
        <S.MessageBox>{message}</S.MessageBox>
        <div>
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
      </S.Wrapper>
    </Modal>
  );
}

export default ConfirmDialog;
