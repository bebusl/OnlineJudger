import Image from "next/image";
import type { InferGetServerSidePropsType, NextPageContext } from "next/types";
import React from "react";
import { getUser } from "../../api/authAPI";
import { Button, Input } from "../../components/common";
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
  const { handleBlur, isValidInputs, isValid, getRef } = useForm({
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
          <Button>Change</Button>
          <Button>Remove</Button>
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
        <LabelInput grandchildRef={linkRef} type="email" name="linkedEmail" />

        <article>
          <h3>Email Notification</h3>
          <Input type="checkbox" isValid={true} name="new deal" />
          <label htmlFor="new deal">new deal</label>
        </article>
        <div>
          <Button>로그아웃</Button>
          <Button>초기화</Button>
          <Button>저장</Button>
        </div>
      </section>
    </WithSideBar>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const auth_cookie = ctx.req?.cookies.Authorization;
  const userInfo = await getUser(auth_cookie);

  if (userInfo.data.success) {
    console.log("여기러 옵니다!");
    return {
      props: { ...userInfo.data.user },
    };
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
