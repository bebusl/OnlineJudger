import React, { useEffect, useState } from "react";
import { Table } from "../common";
import Modal from "../common/Modal";

function Ranking({ onClose }: { onClose: Function }) {
  useEffect(() => {}, []);
  const header = [
    { field: "id", header: "id" },
    { field: "user_id", header: "유저" },
    { field: "problem_id", header: "문제번호" },
    { field: "language", header: "언어" },
    { field: "status", header: "채점상황" },
    { field: "memory", header: "메모리" },
    { field: "real_time", header: "소요 시간" },
    { field: "created_at", header: "제출일자" },
  ];

  const body = [
    {
      id: "3",
      user_id: "test",
      problem_id: (
        <a
          target="_blank"
          href="https://localhost:3443/solution/12?user=test1234"
          rel="noopener noreferrer"
          key="10"
        >
          12
        </a>
      ),
      language: "C",
      status: "PENDING",
      memory: 10,
      field: 299,
      real_time: 1233,
      created_at: "20202--333",
    },
  ];

  return (
    <Modal onClose={onClose}>
      <Table header={header} body={body} />
    </Modal>
  );
}

export default Ranking;
