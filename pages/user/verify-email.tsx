import { Router, useRouter } from "next/router";
import React from "react";
import { verifyEmail } from "../../api/authAPI";
import { Button, FlexBox, Input } from "../../components/common";
import Subscription from "../../components/common/Typhography/Subscription";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";

function VerifyEmail() {
  const { getRef, isValid, handleBlur } = useForm({ types: ["code"] });
  const addNotification = useNotification();
  const router = useRouter();

  return (
    <FlexBox>
      <h1>이메일 인증</h1>
      <Subscription>
        이메일 인증을 마치면 문제를 풀어볼 수 있습니다.
      </Subscription>
      <Input
        ref={getRef("code")}
        isValid={!!getRef("code").current?.value?.length || isValid.code}
        onChange={() => {
          handleBlur("code");
        }}
      />
      <Button
        type="submit"
        disabled={!!getRef("code").current?.value?.length || !isValid.code}
        onClick={async () => {
          const code = getRef("code").current?.value;

          if (code) {
            const res = await verifyEmail({ code });
            if (res.data.success) {
              addNotification("이메일 인증에 성공했습니다.", "success");
              router.back();
            } else {
              addNotification(res.data.err_msg, "error");
            }
          }
        }}
      >
        Verify
      </Button>
    </FlexBox>
  );
}

export default VerifyEmail;
