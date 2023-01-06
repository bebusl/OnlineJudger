import React, { useState } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logoff } from "../../store/slice/authSlice";
import { deleteAccount } from "../../api/authAPI";

import WithSideBar from "../../components/layouts/WithSideBar";
import { Button, FlexBox } from "../../components/common";
import Input, { LabeledInput } from "../../components/common/Input";
import ConfirmDialog from "../../components/common/Dialog/ConfirmDialog";
import Description from "../../components/common/Typhography/Description";
import GoogleLinkButton from "../../components/common/Buttons/OAuthButton/GoogleLinkButton";
import KakaoLinkButton from "../../components/common/Buttons/OAuthButton/KakaoLinkButton";
import useNotification from "../../hooks/useNotification";

function UserProfile() {
  const { avatar, name, email, links } = useAppSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const addNotification = useNotification();
  return (
    <WithSideBar>
      {openModal && (
        <ConfirmDialog
          message={`정말 탈퇴하시겠습니까?\n탈퇴한 계정으로 다시 가입할 수 없습니다`}
          onClose={() => setOpenModal(false)}
          onConfirm={async () => {
            const response = await deleteAccount();
            if (response.data.success) {
              dispatch(logoff());
              addNotification("정상적으로 탈퇴되었습니다", "success");
            }
            addNotification("에러가 발생했습니다", "error");
          }}
        />
      )}
      <section>
        <h2>내 계정</h2>
        <form>
          <Image alt="person" src={avatar} width="100px" height="100px" />
        </form>
        <LabeledInput
          forwardedRef={null}
          text="이메일"
          name="email"
          defaultValue={email}
          readOnly
        />
        <LabeledInput
          forwardedRef={null}
          text="닉네임"
          name="name"
          defaultValue={name}
          readOnly
        />

        <h3>연동된 소셜 계정</h3>
        {links?.length > 0 ? (
          <Input
            type="email"
            name="linkedEmail"
            defaultValue={links[0]?.email}
            readOnly
          />
        ) : (
          <>
            <Description>연동된 소셜 계정이 없습니다</Description>
            <FlexBox flexDirection="row" gap="1rem">
              <GoogleLinkButton />
              <KakaoLinkButton />
            </FlexBox>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            <Button
              $variant="outline"
              width="fit-content"
              style={{ marginRight: "1rem" }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(logoff());
              }}
            >
              로그아웃
            </Button>
            <Button $variant="outline" onClick={() => setOpenModal(true)}>
              탈퇴
            </Button>
          </span>
        </div>
      </section>
    </WithSideBar>
  );
}

export default UserProfile;

UserProfile.defaultProps = {
  authRequired: true,
};
