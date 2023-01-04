import React from "react";
import Modal from "../../common/Modal";
import ScrollBox from "../../common/ScrollBox";
import Ranking from "./Ranking";

function RankingModal({
  onClose,
  problemId,
}: {
  onClose: Function;
  problemId: number;
}) {
  return (
    <Modal onClose={onClose} title="풀이">
      <ScrollBox height="30vh">
        <Ranking problemId={problemId} />
      </ScrollBox>
    </Modal>
  );
}

export default RankingModal;
