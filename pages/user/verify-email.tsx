import React, { MouseEventHandler } from "react";
import { useRouter } from "next/router";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";

import { verifyEmail } from "../../api/authAPI";

import { Button, FlexBox, Input } from "../../components/common";
import Description from "../../components/common/Typhography/Description";

function VerifyEmail() {
  const { register, isValidInputs, getAllValues } = useForm();
  const addNotification = useNotification();
  const router = useRouter();

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    (async () => {
      const { code } = getAllValues() as { code: string };
      if (code) {
        const res = await verifyEmail({ code });
        if (res.data.success) {
          addNotification("이메일 인증에 성공했습니다.", "success");
          router.back();
        } else {
          addNotification(res.data.err_msg, "error");
        }
      }
    })();
  };

  return (
    <>
      <h1>이메일 인증</h1>
      <Description>이메일 인증을 마치면 문제를 풀어볼 수 있습니다.</Description>
      <FlexBox flexDirection="row" alignItems="start">
        <Input {...register("code")} style={{ width: "30vw" }} />
        <Button type="submit" disabled={!isValidInputs()} onClick={handleClick}>
          Verify
        </Button>
      </FlexBox>
    </>
  );
}

export default VerifyEmail;
