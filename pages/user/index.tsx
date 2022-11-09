import Image from "next/image";
import type { InferGetServerSidePropsType, NextPageContext } from "next/types";
import React from "react";
import { getUser } from "../../api/authAPI";
import { Button } from "../../components/common";
import { LabelInput } from "../../components/common/Input";
import WithSideBar from "../../components/templates/WithSideBar";
import useForm from "../../hooks/useForm";

const default_Img =
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&q=50";
function UserProfile({
  id,
  name,
  avatar_url,
  links,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { getRef } = useForm({
    types: ["name", "email", "link"],
  });
  const nameRef = getRef("name");
  const emailRef = getRef("email");
  const linkRef = getRef("link");

  return (
    <WithSideBar>
      <section>
        <h2>내 계정</h2>
        <form>
          <Image
            alt="person"
            src={avatar_url || default_Img}
            width="100px"
            height="100px"
          />
          <Button $variant="outline" width="fit-content">
            Change
          </Button>
          <Button $variant="outline" width="fit-content">
            Remove
          </Button>
        </form>
        <LabelInput
          type="text"
          name="name"
          grandchildRef={nameRef}
          defaultValue={id}
        />
        <LabelInput
          type="text"
          name="email"
          grandchildRef={emailRef}
          defaultValue={name}
        />
        <h5>연동된 소셜 계정</h5>

        {links.length > 0 ? (
          <LabelInput
            grandchildRef={linkRef}
            type="email"
            name="linkedEmail"
            value={links[0]}
          />
        ) : (
          <>
            <p>연동된 소셜 계정이 없습니다</p>
            <a href="https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile&response_type=token&redirect_uri=https://localhost:3443/oauth2/redirect/client&client_id=120623111530-5cf3mkdcfed1m9n8eumn9vsa6dodl43l.apps.googleusercontent.com">
              구글 연동하기
            </a>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button $variant="outline" width="fit-content">
            로그아웃
          </Button>
          <div>
            <Button $variant="outline" width="fit-content">
              초기화
            </Button>
            <Button width="fit-content">저장</Button>
          </div>
        </div>
      </section>
    </WithSideBar>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const auth_cookie = ctx.req?.cookies.Authorization;
  if (auth_cookie) {
    const userInfo = await getUser(auth_cookie);

    if (userInfo.data.success) {
      console.log("여기러 옵니다!");
      return {
        props: { ...userInfo.data.user },
      };
    }
  }
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default UserProfile;

UserProfile.defaultProps = {
  authRequired: true,
};

/**
 * {
    "id": "jinhee",
    "name": "brillbejh@naver.com",
    "avatar_url": "https://lh3.googleusercontent.com/a/ALm5wu3Nq8c1bHdXra164lN--qE4jRJmZRVM3R6VmwQ73w=s96-c",
    "links": [
        {
            "provider": "GOOGLE",
            "email": "bbcbal12@gmail.com",
            "avatar_url": "https://lh3.googleusercontent.com/a/ALm5wu3Nq8c1bHdXra164lN--qE4jRJmZRVM3R6VmwQ73w=s96-c"
        }
    ]
}
 */
