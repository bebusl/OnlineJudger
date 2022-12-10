import React from "react";
import { Button, Input } from "../../components/common";
import useForm from "../../hooks/useForm";
import { resetPassword } from "../../api/authAPI";
import { useRouter } from "next/router";
import Subscription from "../../components/common/Typhography/Subscription";
import useNotification from "../../hooks/useNotification";

function PasswordReset() {
  const { getRef, getAllValues } = useForm({
    types: ["password", "passwordDoubleCheck"],
  });
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
      <Subscription>새로운 비밀번호를 입력해주세요</Subscription>
      <Input ref={getRef("password")} type="password" placeholder="비밀번호" />
      <Input
        ref={getRef("passwordDoubleCheck")}
        type="password"
        isValid={checkPasswordValidation()}
        placeholder="비밀번호 체크"
      />
      <Button type="submit">변경</Button>
    </form>
  );
}

export default PasswordReset;
