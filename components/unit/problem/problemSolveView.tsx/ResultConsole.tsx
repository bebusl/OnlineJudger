import React, { useContext } from "react";
import { ProblemContext } from "../../../../pages/problem/[problemId]";
import { useAppSelector } from "../../../../hooks/useStore";

import styled from "styled-components";
import { ProblemDetail } from "../../../../api/scheme/problem";

function ResultConsole() {
  const runResult = useAppSelector((store) => store.socket.runResult);
  // run pending일 떄 상태 바꾸고, 제출 마무리 되면 바꿔주는 것도 잊지 마오,,ㅎ
  const problem = useContext(ProblemContext) as ProblemDetail;
  //   const isValidResult =
  //     runResult.result_list && runResult.result_list.length > 1;

  const isValidResult = true;

  if (isValidResult)
    return (
      <div style={{ padding: "0.5rem" }}>
        <TabHeader>실행 결과</TabHeader>

        <ResultConsoleTable>
          <tbody>
            <tr className="title">
              <td>테스트{+1}</td>
            </tr>
            <tr>
              <td className="label">입력</td>
              <td>{problem.test_case_examples[0].input}</td>
            </tr>
            <tr>
              <td className="label">기대값</td>
              <td>
                <pre>{problem.test_case_examples[0].output}</pre>
              </td>
            </tr>
            <tr>
              <td className="label">실행결과</td>
              <td>
                <pre>여기에 출력</pre>
              </td>
            </tr>
            <tr>
              <td className="label">출력</td>
              <td>맞았습니다!</td>
            </tr>
          </tbody>
        </ResultConsoleTable>
      </div>
    );

  if (runResult)
    return (
      <>
        <code>테스트 결과 (~˘▾˘)~</code>
        <code>{runResult?.status}</code>
        {runResult?.result_list?.length && (
          <code>
            {runResult?.result_list?.length - 1}개 중
            {
              runResult.result_list?.slice(1).filter((result) => result.correct)
                .length
            }
            개 성공
          </code>
        )}
      </>
    );
  return <code>실행 결과가 여기에 표시됩니다</code>;
}

export default ResultConsole;

const ResultConsoleTable = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.gray500};
  tr {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  td {
    text-align: start;
  }

  .label {
    text-align: right;
    :after {
      content: "〉";
      padding-right: 0.5rem;
    }
  }
  .title {
    font-weight: bold;
  }
  .right {
    color: #5a65ff;
  }

  .wrong {
    color: #ff5a5a;
  }
`;

const TabHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0.5rem 0;
`;
