import React from "react";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";

import { sendResetPasswordEmailLink } from "../../api/authAPI";

import { Button, FlexBox, Input } from "../../components/common";
import Description from "../../components/common/Typhography/Description";
import { regexPatterns } from "../../utils/validator";

function PasswordReset() {
  const { register, isValidInputs, getAllValues } = useForm();
  const addNotification = useNotification();

  return (
    <>
      <h3>이메일을 입력해주세요</h3>
      <p>비밀번호 재설정 링크를 받을 이메일을 입력해주세요</p>
      <FlexBox flexDirection="row" alignItems="start">
        <Input
          {...register("email", { pattern: regexPatterns.email })}
          errorMessage="올바르지 않은 email 형식입니다."
          style={{ width: "30vw" }}
        />
        <Button
          type="submit"
          disabled={!isValidInputs()}
          onClick={async () => {
            const email = getAllValues() as { email: string };
            if (email) {
              sendResetPasswordEmailLink(email);
              addNotification("메시지 전송에 성공했습니다.", "success");
            }
          }}
        >
          Verify
        </Button>
      </FlexBox>
      <Description>
        잘못된 이메일 입력 시 이메일이 발송되지 않습니다.
      </Description>
      <Description>
        이메일이 기억나지 않는다면 brill_be@naver.com로 문의바랍니다.
      </Description>
    </>
  );
}

export default PasswordReset;
