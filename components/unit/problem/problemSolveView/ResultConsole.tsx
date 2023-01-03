import React from "react";
import { useAppSelector } from "../../../../hooks/useStore";

import styled from "styled-components";

interface ResultConsoleProps {
  testCases: { input: string; output: string }[];
}

function ResultConsole({ testCases }: ResultConsoleProps) {
  const { isRunning, isError, runResult } = useAppSelector(
    (store) => store.socket
  );
  const isValidResult = isRunning || runResult || isError;

  if (isValidResult)
    return (
      <div style={{ padding: "0.5rem" }}>
        <TabHeader>실행 결과</TabHeader>

        <ResultConsoleTable>
          <tbody>
            {runResult?.result_list?.slice(1).map((result, idx) => (
              <React.Fragment key={idx}>
                <tr className="title">
                  <td>테스트{idx + 1}</td>
                </tr>
                <tr>
                  <td className="label">입력</td>
                  <td>{testCases[idx].input}</td>
                </tr>
                <tr>
                  <td className="label">기대값</td>
                  <td>
                    <pre>{testCases[idx].output}</pre>
                  </td>
                </tr>
                <tr>
                  <td className="label">실행결과</td>
                  <td className={result.correct ? "right" : "wrong"}>
                    {isRunning
                      ? "대기중.."
                      : result.correct
                      ? "정답입니다"
                      : "오답입니다"}
                  </td>
                </tr>
                <tr>
                  <td className="label">출력</td>
                  <td>{isRunning ? "대기중.." : result.output}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </ResultConsoleTable>
        <br />
        <code>테스트 결과 (~˘▾˘)~ {runResult?.status}</code>

        {runResult?.result_list?.length && (
          <div>
            {runResult?.result_list?.length - 1}개 중
            {
              runResult.result_list?.slice(1).filter((result) => result.correct)
                .length
            }
            개 성공
          </div>
        )}
      </div>
    );

  return <code>실행 결과가 여기에 표시됩니다</code>;
}

export default ResultConsole;

const ResultConsoleTable = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.gray500};
  tr {
    border: 1px solid ${({ theme }) => theme.colors.gray150};
  }
  td {
    text-align: start;
  }

  .label {
    text-align: right;
    width: 10rem;
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
