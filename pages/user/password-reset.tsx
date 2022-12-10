import React from "react";
import { Button, Input } from "../../components/common";
import WithSideBar from "../../components/templates/WithSideBar";
import useForm from "../../hooks/useForm";

function PasswordReset() {
  const { getRef, handleBlur, getAllValues } = useForm({
    types: ["password", "passwordDoubleCheck"],
  });
  const checkPasswordValidation = () => {
    const { password, passwordDoubleCheck } = getAllValues();
    if (password === passwordDoubleCheck) return true;
    return false;
  };
  return (
    <WithSideBar>
      <form>
        <Input
          ref={getRef("password")}
          type="password"
          placeholder="비밀번호"
        />
        <Input
          ref={getRef("passwordDoubleCheck")}
          type="password"
          isValid={checkPasswordValidation()}
          placeholder="비밀번호 체크"
        />
        <Button type="submit">변경</Button>
      </form>
    </WithSideBar>
  );
}

export default PasswordReset;
