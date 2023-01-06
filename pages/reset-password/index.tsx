import React from "react";
import { useRouter } from "next/router";
import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";

import { resetPassword } from "../../api/authAPI";

import { Button, Input } from "../../components/common";
import Description from "../../components/common/Typhography/Description";
import { regexPatterns } from "../../utils/validator";

function PasswordReset() {
  const { register, getAllValues } = useForm();
  const router = useRouter();
  const addNotification = useNotification();

  const checkPasswordValidation = () => {
    const { password, passwordDoubleCheck } = getAllValues();
    if (password === passwordDoubleCheck) return true;
    return false;
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const { code } = router.query;
        const { password } = getAllValues();
        if (code && password) {
          const res = await resetPassword({
            password: password as string,
            code: code as string,
          });
          if (res.data.success) {
            addNotification("비밀번호 재설정에 성공했습니다.", "success");
            router.replace("login");
          } else {
            addNotification("비밀번호 재설정에 실패했습니다.", "error");
          }
        }
      }}
    >
      <Description>새로운 비밀번호를 입력해주세요</Description>
      <Input
        type="password"
        placeholder="비밀번호"
        {...register("password", { pattern: regexPatterns.password })}
      />
      <Input
        {...register("passwordDoubleCheck", {
          validate: checkPasswordValidation,
        })}
        type="password"
        placeholder="비밀번호 체크"
      />
      <Button type="submit">변경</Button>
    </form>
  );
}

export default PasswordReset;
