import { useRouter } from "next/router";
import React from "react";
import { sendResetPasswordEmailLink } from "../../api/authAPI";
import { Button, FlexBox, Input } from "../../components/common";
import Subscription from "../../components/common/Typhography/Subscription";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";

function PasswordReset() {
  const { getRef, handleBlur, isValid } = useForm({
    types: ["email"],
  });
  const addNotification = useNotification();

  const router = useRouter();

  return (
    <FlexBox>
      <h3>이메일을 입력해주세요</h3>
      <Subscription>
        비밀번호 재설정 링크를 받을 이메일을 입력해주세요
      </Subscription>
      <Input
        ref={getRef("email")}
        isValid={!!getRef("email").current?.value?.length || isValid.email}
        onChange={() => {
          handleBlur("email");
        }}
      />
      <Button
        type="submit"
        disabled={!!getRef("email").current?.value?.length || !isValid.email}
        onClick={async () => {
          const email = getRef("email").current?.value;
          if (email) {
            sendResetPasswordEmailLink({ email });
            addNotification("메시지 전송에 성공했습니다.", "success");
            //router.push("/reset-password/reset");
          }
        }}
      >
        Verify
      </Button>
    </FlexBox>
  );
}

export default PasswordReset;
