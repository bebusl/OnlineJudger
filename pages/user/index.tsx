import Image from "next/image";
import React from "react";
import { Button } from "../../components/common";
import Input, { LabeledInput } from "../../components/common/Input";
import WithSideBar from "../../components/templates/WithSideBar";
import { GOOGLE_AUTH_LINK_URL } from "../../constants/url";
import useForm from "../../hooks/useForm";
import { useAppSelector } from "../../hooks/useStore";

function UserProfile() {
  const { getRef } = useForm({
    types: ["name", "email", "link"],
  });
  const nameRef = getRef("name");
  const emailRef = getRef("email");
  const linkRef = getRef("link");

  const { avatar, id, name, links } = useAppSelector((state) => state.auth);

  return (
    <WithSideBar>
      <section>
        <h2>내 계정</h2>
        <form>
          <Image alt="person" src={avatar} width="100px" height="100px" />
          {/* <Button $variant="outline" width="fit-content">
            Change
          </Button>
          <Button $variant="outline" width="fit-content">
            Remove
          </Button> */}
        </form>
        <LabeledInput
          text="ID"
          name="name"
          forwardref={nameRef}
          defaultValue={id}
        />
        <LabeledInput
          text="EMAIL"
          name="name"
          forwardref={emailRef}
          defaultValue={id}
        />

        <h3>연동된 소셜 계정</h3>

        {links?.length > 0 ? (
          <Input type="email" name="linkedEmail" value={links[0]?.email} />
        ) : (
          <>
            <p>연동된 소셜 계정이 없습니다</p>
            <Button $variant="outline">
              <a href={GOOGLE_AUTH_LINK_URL}>구글 연동하기</a>
            </Button>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Button $variant="outline" width="fit-content">
              로그아웃
            </Button>
            <Button $variant="outline">탈퇴</Button>
          </div>
          <div>
            {/* <Button $variant="outline" width="fit-content">
              초기화
            </Button> */}
            <Button width="fit-content">저장</Button>
          </div>
        </div>
      </section>
    </WithSideBar>
  );
}

// export async function getServerSideProps(ctx: NextPageContext) {
//   const auth_cookie = ctx.req?.headers.cookie;
//   console.log("COOKIE", Authorization.cookie);
//   // auth_cookie 없을 떄 로그아웃 처리해주거나 하기.! 아니면 재갱신을 해주등가.
//   try {
//     const userInfo = await getUser(auth_cookie);
//     if (userInfo.data?.success) {
//       return {
//         props: { ...userInfo.data.user },
//       };
//     }
//   } catch (e) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     notFound: true,
//   };
// }

export default UserProfile;

UserProfile.defaultProps = {
  authRequired: true,
};
