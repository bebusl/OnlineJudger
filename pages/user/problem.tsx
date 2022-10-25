import React from "react";
import { Button, Table } from "../../components/common";
import WithSideBar from "../../components/templates/WithSideBar";

function SolveList() {
  const testHeader = ["id", "제목", "태그", ""];
  const testBody = [
    ["19992", "해적왕이 될거야", "DP", <Button key="19992">자세히보기</Button>],
    [
      "19994",
      "해적왕이 될수있을것같니?",
      "DP",
      <Button key="19994">자세히보기</Button>,
    ],
    ["19995", "나는 버기", "DP", <Button key="19995">자세히보기</Button>],
    ["1999", "나는 버기", "DP", <Button key="1999">자세히보기</Button>],
    ["19996", "나는 버기", "DP", <Button key="19996">자세히보기</Button>],
  ];

  return (
    <WithSideBar>
      <>
        <h4>선택한 메뉴 이름</h4>
        <Table header={testHeader} body={testBody} />
      </>
    </WithSideBar>
  );
}

export default SolveList;

// SolveList.defaultProps = {
//   authRequired: true,
// };
