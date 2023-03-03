import React, { FormEventHandler, useState } from "react";

import { updatePassword } from "../../api/authAPI";

import useForm from "../../hooks/useForm";
import useNotification from "../../hooks/useNotification";
import { regexPatterns } from "../../utils/validator";

import { Button, Input } from "../../components/common";
import WithSideBar from "../../components/layouts/WithSideBar";
import Description from "../../components/common/Typhography/Description";

function PasswordReset() {
  const { register, getAllValues } = useForm();
  const addNotification = useNotification();
  const [errorMsg, setErrorMsg] = useState("");

  const checkPasswordValidation = () => {
    const { password, passwordDoubleCheck } = getAllValues();
    if (password === passwordDoubleCheck) return true;
    return false;
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { currentPassword, password } = getAllValues();

    try {
      const res = await updatePassword({
        oldPassword: currentPassword as string,
        password: password as string,
      });
      if (res.data.success) {
        addNotification("비밀번호 변경에 성공했습니다.", "success");
      } else {
        setErrorMsg(res.data.err_msg);
        addNotification("비밀번호 변경에 실패했습니다", "error");
      }
    } catch (e) {
      addNotification("비밀번호 변경에 실패했습니다", "error");
    }
  };

  return (
    <WithSideBar>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          {...register("currentPassword")}
        />
        <Input
          type="password"
          placeholder="변경할 비밀번호"
          {...register("password", {
            pattern: regexPatterns.password,
          })}
          description="6~12자 영/수 혼합"
          errorMessage="비밀번호 양식을 지켜주세요"
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordDoubleCheck", {
            validate: () => checkPasswordValidation(),
          })}
          errorMessage="비밀번호가 일치하지 않습니다"
        />
        {errorMsg && (
          <Description style={{ color: "red" }}>{errorMsg}</Description>
        )}

        <Button type="submit">변경</Button>
      </form>
    </WithSideBar>
  );
}

export default PasswordReset;

PasswordReset.defaultProps = {
  authRequired: true,
};
