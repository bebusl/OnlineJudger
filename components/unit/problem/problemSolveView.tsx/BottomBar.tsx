import React from "react";
import { useAppSelector } from "../../../../hooks/useStore";
import { Button, FlexBox } from "../../../common";

function BottomBar() {
  //const isLogin = useAppSelector((store) => store.auth.isLogin);
  const isLogin = true;

  if (isLogin)
    return (
      <FlexBox flexDirection="row" justifyContent="space-between">
        <Button> 다른 유저의 코드 보기</Button>
        <div>
          <Button>초기화</Button>
          <Button>코드실행</Button>
          <Button>제출 및 채점</Button>
        </div>
      </FlexBox>
    );

  return (
    <FlexBox flexDirection="row" justifyContent="end">
      <Button>로그인하기</Button>
    </FlexBox>
  );
}

export default BottomBar;
