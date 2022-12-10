import React, { ReactElement, useEffect, useRef, useState } from "react";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { getProblemDetail } from "../../api/problemsAPI";
import {
  JAVA,
  C,
  CPP,
  PYTHON2,
  PYTHON3,
  LANGUAGES_TYPE,
} from "../../constants/language";
import dynamic from "next/dynamic";
import { Button, FlexBox } from "../../components/common";
import Table from "../../components/common/Table/Table";
import { WEB_SOCKET_URL } from "../../constants/url";
import { makeAuthHeader } from "../../utils/authUtils";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import { gradeProblem, runProblem } from "../../api/submissionsAPI";
import useNotification from "../../hooks/useNotification";
import ScrollBox from "../../components/common/ScrollBox";
import { useAppSelector } from "../../hooks/useStore";
import { GetProblemResponse } from "../../api/scheme/problem";
import styled from "styled-components";

const RankingModal = dynamic(
  import("../../components/submissions/RankingModal"),
  {
    ssr: false,
  }
);
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });

let socketClient: StompJS.Client | null = null;

function ProblemDetail(props: GetProblemResponse) {
  const {
    id,
    title,
    time_limit,
    memory_limit,
    desc,
    input_desc,
    output_desc,
    test_case_examples,
    languages,
  } = props;
  const router = useRouter();
  const isLogin = useAppSelector((store) => store.auth.isLogin);

  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<LANGUAGES_TYPE>(JAVA);
  const editorRef = useRef(null);
  const [result, setResult] = useState();
  const addNoti = useNotification();

  function connection() {
    const sock = new SockJS(WEB_SOCKET_URL);
    socketClient = StompJS.over(sock);
    const authToken = makeAuthHeader();
    if (authToken && socketClient) {
      socketClient.connect(
        authToken,
        function () {
          if (socketClient?.connected) {
            socketClient?.subscribe("/user/queue/notification", (msg) => {
              const body = JSON.parse(msg.body);
              addNoti(body.message, body.variant);
            });
            socketClient?.subscribe("/user/queue/problem/run", (msg) => {
              const body = JSON.parse(msg.body);
              // setResult(
              //   `컴파일 결과\n${
              //     body.result_list.length > 0 ? "컴파일 성공" : "컴파일 실패"
              //   }\n실행 결과${body.result_list[1].result}\n채점 결과${
              //     body.result_list[1].correct
              //   }`
              // );
            });
          }
        },
        function (error) {
          console.log("ERROR", error);
        }
      );
    }
  }

  useEffect(() => {
    connection();
    return () => {
      if (socketClient?.connected) {
        socketClient?.disconnect(() => {
          console.log("socket disconnected");
        });
      }
    };
  }, []);

  return (
    <>
      {isOpen && (
        <RankingModal onClose={() => setIsOpen(false)} problemId={id} />
      )}

      <FlexBox as={"nav"} flexDirection="row" justifyContent="space-between">
        <h1>{title}</h1>
        <select
          name="language"
          id="language-select"
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="java">JAVA</option>
          <option value="python2">PYTHON2</option>
          <option value={PYTHON3}>PYTHON3</option>
          <option value="c++">c++</option>
          <option value="c">c</option>
        </select>
      </FlexBox>
      <FlexBox flexDirection="row" style={{ width: "100vw" }}>
        <ScrollBox
          as="section"
          style={{ width: "50%", height: "80vh", padding: "16px" }}
        >
          <article>
            <h3>문제 설명</h3>
            <p>{desc}</p>
          </article>
          <hr />
          <article>
            <h3>제한사항</h3>
            <h4>메모리</h4>
            <p>{time_limit}</p>
            <h4>시간</h4>
            <p>{memory_limit}</p>
            <h4>제출 가능 언어</h4>
            <p>{languages.join(" ")}</p>
          </article>
          <hr />
          <article>
            <>
              <h3>입출력 설명</h3>
              <h4>입력 설명</h4>
              <p>{input_desc}</p>
              <h4>출력 설명</h4>
              <p>{output_desc}</p>
              <hr />
              <h3>예제</h3>
              <Table
                header={[
                  { field: "input", header: "입력" },
                  { field: "output", header: "출력" },
                ]}
                body={
                  test_case_examples as Record<
                    string,
                    string | number | JSX.Element
                  >[]
                }
              />
            </>
          </article>
        </ScrollBox>

        <section style={{ width: "50%", padding: "16px" }}>
          <MonacoEditor
            height="50vh"
            language={language}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
            options={{
              minimap: {
                enabled: false,
              },
            }}
          />
          <FlexBox style={{ height: "30vh" }}>
            <ScrollBox>
              <code>{result}</code>
              <ul>
                {RIGHT_ANSWER?.result_list.length > 1 &&
                  RIGHT_ANSWER?.result_list.slice(1).map((result, idx) => {
                    return (
                      <>
                        <STable>
                          <tbody>
                            <tr className="title">
                              <td>테스트{idx + 1}</td>
                            </tr>
                            <tr>
                              <td align="right">
                                입력 <span>〉</span>
                              </td>
                              <td>{test_case_examples[idx]?.input}</td>
                            </tr>
                            <tr>
                              <td align="right">
                                기대값 <span>〉</span>
                              </td>
                              <td>
                                <pre>{test_case_examples[idx]?.output}</pre>
                              </td>
                            </tr>
                            <tr>
                              <td align="right">
                                실행결과 <span>〉</span>
                              </td>
                              <td>
                                <pre>{result.output}</pre>
                              </td>
                            </tr>
                            <tr>
                              <td align="right">
                                출력 <span>〉</span>
                              </td>
                              <td
                                className={result.correct ? "right" : "wrong"}
                              >
                                {result.correct ? "맞았습니다" : "틀렸습니다"}
                              </td>
                            </tr>
                          </tbody>
                        </STable>
                      </>
                    );
                  })}
              </ul>
              <code>
                <pre>
                  테스트 결과 (~˘▾˘)~
                  {RIGHT_ANSWER.status}
                </pre>
              </code>
              <code>{RIGHT_ANSWER.status}</code>
              <code>n개 중 m개 성공</code>
            </ScrollBox>
          </FlexBox>
        </section>
      </FlexBox>
      <FlexBox flexDirection="row" justifyContent={"space-between"}>
        {isLogin ? (
          <>
            <Button onClick={() => setIsOpen(true)}>
              다른 유저의 코드 보기
            </Button>
            <div>
              <Button onClick={() => editorRef.current.setValue("")}>
                초기화
              </Button>
              <Button
                onClick={() => {
                  const code = editorRef.current?.getValue();
                  runProblem(id, code, language);
                }}
              >
                코드 실행
              </Button>
              <Button
                onClick={() => {
                  const code = editorRef.current?.getValue();
                  gradeProblem(id, code, language);
                }}
              >
                제출 및 채점
              </Button>
            </div>
          </>
        ) : (
          <>
            <div />
            <Button onClick={() => router.push("/login")}>로그인하기</Button>
          </>
        )}
      </FlexBox>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { problemId } = ctx.query;
  if (problemId) {
    try {
      const problemDetail = await getProblemDetail(problemId as string);
      if (problemDetail.data.success)
        return {
          props: problemDetail.data,
        };
    } catch (e) {
      return {
        redirect: {
          destination: "/problem?page=1",
          permanent: false,
        },
      };
    }
  }
}

ProblemDetail.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default ProblemDetail;

const STable = styled.table`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.gray500};
  & tr {
    border: 1px solid ${({ theme }) => theme.colors.gray100};
  }
  & .title {
    font-weight: bold;
  }
  & .right {
    color: #5a65ff;
  }

  & .wrong {
    color: #ff5a5a;
  }
`;

export const RIGHT_ANSWER = {
  created_at: "2022-12-08T11:47:19.079",
  updated_at: "2022-12-08T11:47:19.174215858",
  id: "6391cec77b89c103bda4e108",
  user_id: "test1234",
  problem_id: 3,
  code: 'a = input()\nb= input()\nprint("Hello "+a)\nprint("Hello2 "+b)',
  language: "PYTHON3",
  status: "SUCCESS",
  memory: 0,
  real_time: 13,
  code_length: 59,
  result_list: [
    {
      id: 0,
      cpu_time: 0,
      real_time: 0,
      memory: 0,
      signal: 0,
      exit_code: 0,
      error: 0,
      result: 0,
      correct: true,
    },
    {
      id: 0,
      cpu_time: 0,
      real_time: 13,
      memory: 0,
      signal: 0,
      exit_code: 0,
      error: 0,
      result: 0,
      output: "Hello World\nHello2 World2",
      correct: true,
    },
    {
      id: 1,
      cpu_time: 0,
      real_time: 11,
      memory: 0,
      signal: 0,
      exit_code: 0,
      error: 0,
      result: 0,
      output: "Hello World3\nHello2 World4",
      correct: true,
    },
  ],
  judge: false,
};
