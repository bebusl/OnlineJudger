import React, { MouseEventHandler, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useStore";

import { gradeProblem, runProblem } from "../../../../api/submissionsAPI";

import { LANGUAGES_TYPE } from "../../../../utils/constants/language";

import { Button, FlexBox } from "../../../common";
import ConfirmDialog from "../../../common/Dialog/ConfirmDialog";
import RankingModal from "../../submissions/RankingModal";
import { pendingRunResult } from "../../../../store/slice/socketSlice";

function BottomBar({
  getCode,
  resetCode,
  problemId,
  language,
}: {
  getCode: Function;
  resetCode: Function;
  problemId: number;
  language: LANGUAGES_TYPE;
}) {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenRankingModal, setIsOpenRankingModal] = useState(false);
  const isLogin = useAppSelector((store) => store.auth.isLogin);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const openConfirmModal = () => setIsOpenConfirmModal(true);
  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const openRankingModal = () => setIsOpenRankingModal(true);
  const closeRankingModal = () => setIsOpenRankingModal(false);

  const runJudger = () => {
    const code = getCode();
    if (code) runProblem(problemId, code, language);
    dispatch(pendingRunResult());
  };

  const submitCode = () => {
    const code = getCode();
    if (code) gradeProblem(problemId, code, language);
  };

  const onConfirmSubmit = () => {
    submitCode();
    router.push("/user/problem");
  };

  const handleRunBtnClick: MouseEventHandler = (e) => {
    e.preventDefault();
    runJudger();
  };

  const handleSubmitBtnClick: MouseEventHandler = (e) => {
    e.preventDefault();
    openConfirmModal();
  };

  if (isLogin)
    return (
      <>
        {isOpenConfirmModal && (
          <ConfirmDialog
            onConfirm={onConfirmSubmit}
            onClose={closeConfirmModal}
            message="제출하면 이 페이지를 벗어나게 됩니다."
          />
        )}
        {isOpenRankingModal && (
          <RankingModal problemId={problemId} onClose={closeRankingModal} />
        )}

        <FlexBox flexDirection="row" justifyContent="space-between">
          <Button onClick={openRankingModal}> 다른 유저의 코드 보기</Button>
          <div>
            <Button onClick={() => resetCode()}>초기화</Button>
            <Button onClick={handleRunBtnClick}>코드실행</Button>
            <Button onClick={handleSubmitBtnClick}>제출 및 채점</Button>
          </div>
        </FlexBox>
      </>
    );

  return (
    <FlexBox flexDirection="row" justifyContent="end">
      <Button onClick={() => router.push("/login")}>로그인하기</Button>
    </FlexBox>
  );
}

export default BottomBar;
