import React, { useEffect, useState } from "react";
import { Table } from "../common";
import Modal from "../common/Modal";

function Ranking({ onClose }: { onClose: Function }) {
  useEffect(() => {}, []);
  return (
    <Modal onClose={onClose}>
      <Table
        header={[
          "id",
          "유저",
          "제출한 언어",
          "상태",
          "메모리",
          "시간",
          "제출일자",
          "코드 길이",
        ]}
        body={[
          [
            "3",
            "test1234",
            <a
              target="_blank"
              href="https://localhost:3443/solution/12?user=test1234"
              rel="noopener noreferrer"
              key="10"
            >
              12
            </a>,
            "C",
            "100",
            "1000",
            "200",
            "2022-11-26",
            "0303",
          ],
        ]}
      />
    </Modal>
  );
}

export default Ranking;

//  {
//       "id": "string",
//       "user_id": "string",
//       "problem_id": 0,
//       "language": "C",
//       "status": "PENDING",
//       "memory": 0,
//       "real_time": 0,
//       "created_at": "2022-11-26T17:49:02.811Z",
//       "updated_at": "2022-11-26T17:49:02.811Z",
//       "code": "string",
//       "code_length": 0
//     }

// {
//   "page": 0,
//   "problem_id": 1,
//   "language": "C",
//   "user_id": "test1234",
//   "is_ranking": false
//}

// 전체

// props로 받을 것 : problem_id => problem_id로 한정하면 한 문제에 대한 랭킹을 보는 것.
// languages : language
// is_ranking : true는 무조건
